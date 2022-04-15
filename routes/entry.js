
const mysql = require('mysql')
const db = require('../connect-promisify');
const dayjs = require('dayjs')
var shortid = require('shortid');

const EntryRoute = {

    async fetchEntryInfo(req, res, next) {
        const q = req.query;
        const p =  req.params;
        const b = req.body;
    // check if entry exists
    
        console.log(`q = ${JSON.stringify(q)}, id = ${JSON.stringify(p)}, b = ${JSON.stringify(b)}`);
        if (!p || !b.requestor_id) res.status(500).send('Invalid request.')
        else {
            const qString = `SELECT * FROM entries WHERE entry_id = ${mysql.escape(p.id)}`
            const results = await db.query(qString).catch(err => {console.log(err)})
            if (!results) res.status(404).send('Entry does not exist.')
            else {
                if (results.private_flag == 1 && b.requestor_id != results.user_id) {
                    res.status(404).send('Unauthorized.')
                    return;
                }
                if (results.public_flag == 1 || b.requestor_id == results.admin_id) {
                    res.status(404).send('Unauthorized.')
                    return;
                }
                // get conditions

                var conditionsQuery = 'select * from `conditions` where `entry_id` = ' + mysql.escape(p.id)
                const conditions = await db.query(conditionsQuery).catch(err => {console.log(err)})
                if (conditions) {
                    results.push(conditions[0])
                }

                var insectsQuery = 'select * from `insects_caught` where `entry_id` = ' + mysql.escape(p.id)
                const insects = await db.query(insectsQuery).catch(err => {console.log(err)})
                if (insects) {
                    results.push(insects[0])
                }

                var fliesQuery = 'select * from `flies_used` where `entry_id` = ' + mysql.escape(p.id)
                const flies = await db.query(fliesQuery).catch(err => {console.log(err)})
                if (flies) {
                    results.push(flies[0])
                }

                var fishQuery = 'select * from `fish_caught` where `entry_id` = ' + mysql.escape(p.id) 
                    // + ' and `fly_type` = ' + mysql.escape(flies.fly_type)
                    // ^ not sure if we really need this FK constraint
                const fish = await db.query(fishQuery).catch(err => {console.log(err)})
                if (fish[0]) {
                    console.log(fish)
                    results[results.length] = fish[0]
                }

                res.status(200).send(Object.assign(...results))
            }
        }
    },

    async searchEntries(req, res, next) {
        const q = req.query;
        const p = req.params;
        const b = req.body;
        // check if entry exists in public entries, or in users own private entries

        console.log(`q = ${JSON.stringify(q)}, id = ${JSON.stringify(p)}, b = ${JSON.stringify(b)}`);
        if (!b.requestor_id) res.status(500).send('Invalid request.')
        else {
            var qString = `SELECT * FROM entries WHERE `
            if (b.location) {
                qString = qString + `location = ${mysql.escape(b.location)}`
            }
            if (b.date) {
                unixms = parseInt(b.date) * 1000
                day = dayjs(unixms)
                console.log(day)
                mindate = day.startOf('day').unix()
                maxdate = day.endOf('day').unix()
                console.log(dayjs(b.date).startOf('day'))
                qString = qString + ` AND date < ${mysql.escape(maxdate)} AND date > ${mysql.escape(mindate)}`
            }
            console.log(qString)

            // var conditionsQuery = ''
            // if (b.conditions.water_flow) {
            //     qString = qString + `location = ${mysql.escape(b.conditions.water_flow)}`
            // }

            // if (b.conditions.water_visibility) {

            // }

            const results = await db.query(qString).catch(err => {throw err})
            
            if (!results) res.status(200).send([])
            else {
                results.forEach(result => {
                    if (b.requestor_id != result.user_id && b.requestor_id != result.admin_id) {
                        // remove result if user doesn't have permission
                        result = null;
                    }

                })

                res.status(200).send(results)
            }
        }
    },

    async createEntry(req, res, next) {
        const q = req.query;
        const p = req.params;
        const b = req.body;

        console.log(`q = ${JSON.stringify(q)}, id = ${JSON.stringify(p)}, b = ${JSON.stringify(b)}`);
        if (!b.requestor_id) res.status(500).send('Invalid request.')
        else {
            // get an admin id
            const adminids = await db.query('select `admin_id` from `admins`').catch(err => {throw err})
            console.log(adminids)
            admin =  adminids[Math.floor(Math.random() * adminids.length)].admin_id;
            
            // format location
            const new_location = () => {
                if (!b.location) return 'null'
                else return b.location
            }

            // generate entry id
            const new_entry_id = shortid.generate();

            var qString = 'INSERT INTO `entries`(`entry_id`, `location`, `date`, `private_flag`, `user_id`, `admin_id`, `public_flag`) values' +
                `(${mysql.escape(new_entry_id)}, ${mysql.escape(new_location())}, '${mysql.escape(dayjs().unix())}', '${(parseInt(b.private_flag))}', ${mysql.escape(b.requestor_id)}, ` +
                `${mysql.escape(admin)}, '${parseInt(b.public_flag)}' )`

            console.log(qString)

            const results = await db.query(qString).catch(err => {throw err})

            if (!results) res.status(200).send([])
            else {

                res.status(200).send(results)
            }
        }
    },

    async createReview(req, res, next) {
        const q = req.query;
        const p = req.params;
        const b = req.body;

        console.log(`q = ${JSON.stringify(q)}, id = ${JSON.stringify(p)}, b = ${JSON.stringify(b)}`);
        if (!b.requestor_id) res.status(500).send('Invalid request.')
        else {
            const entryid = p.id
            const rating = q.rating
            // get entry
            const entry = await db.query('select * from `entries` where `entry_id` = ' + mysql.escape(entryid)).catch(err => {throw err})



            var authorized = false;

            if (entry.public_flag == '0') {
                // check groups
                // get all authorized groups of requestor
                const requestor_groups = await db.query('select * from `user_groups` where `user_id` = ' + mysql.escape(b.requestor_id))
                requestor_groups.map(entry => entry.group_id)

                // get all authorized groups of entry
                const entry_groups = await db.query('select * from `entry_groups` where `entry_id` = ' + mysql.escape(p.id))
                entry_groups.map(e => e.group_id)

                
                // for each group, check if it is one of the groups for the entry
                requestor_groups.forEach(group => {
                    if (entry_groups.indexOf('group') !== -1) {
                        authorized = true
                    }
                })
            }
            else {
                authorized = true
            }

            if (b.requestor_id != entry.user_id && !authorized) {
                res.status(500).send('Insufficient permissions.')
                return;
            }

            var qString = 'insert into `reviews`(`entry_id`, `rating`, `user_id`) values' +
                `(${mysql.escape(p.id)}, ${mysql.escape(q.rating)}, ${mysql.escape(b.requestor_id)})`

            console.log(qString)

            const results = await db.query(qString).catch(err => {throw err})

            if (!results) res.status(200).send([])
            else {
                res.status(200).send(results)
            }
        }
    },

    async deleteReview(req, res, next) {
        const q = req.query;
        const p = req.params;
        const b = req.body;

        console.log(`q = ${JSON.stringify(q)}, id = ${JSON.stringify(p)}, b = ${JSON.stringify(b)}`);
        if (!b.requestor_id) res.status(500).send('Invalid request.')
        else {
            const entryid = p.id
            // get entry
            const review = await db.query('select * from `reviews` where `entry_id` = ' + mysql.escape(entryid) +
                ' and `user_id` = ' + mysql.escape(q.userid)).catch(err => {throw err})
            console.log(review.sql)
            
            const entry = await db.query('select * from `entries` where `entry_id` = ' + mysql.escape(entryid) +
                ' and `user_id` = ' + mysql.escape(q.userid)).catch(err => {throw err})


            if ((!review[0] || !entry[0]) || (b.requestor_id != review[0].user_id && b.requestor_id != entry[0].admin_id )) {
                res.status(500).send('Insufficient permissions.')
                return;
            }

            var qString = 'delete from `reviews` where `entry_id` = ' + mysql.escape(p.id) +
                ' and `user_id` = ' + mysql.escape(q.userid)

            console.log(qString)

            const results = await db.query(qString).catch(err => {throw err})

            if (!results) res.status(200).send([])
            else {
                res.status(200).send(results)
            }
        }
    },

    async deleteEntry(req, res, next) {
        const q = req.query;
        const p = req.params;
        const b = req.body;

        console.log(`q = ${JSON.stringify(q)}, id = ${JSON.stringify(p)}, b = ${JSON.stringify(b)}`);
        if (!b.requestor_id) res.status(500).send('Invalid request.')
        else {
            const entryid = p.id

            const entry = await db.query('select * from `entries` where `entry_id` = ' + mysql.escape(entryid) +
                ' and `user_id` = ' + mysql.escape(b.requestor_id)).catch(err => {throw err})


            if (!entry[0] || b.requestor_id != entry[0].user_id) {
                res.status(500).send('Insufficient permissions.')
                return;
            }

            var qString = 'delete from `entries` where `entry_id` = ' + mysql.escape(p.id) +
                ' and `user_id` = ' + mysql.escape(b.requestor_id)

            console.log(qString)

            const results = await db.query(qString).catch(err => {throw err})

            if (!results) res.status(200).send([])
            else {
                res.status(200).send(results)
            }
        }
    },



}

module.exports = EntryRoute;
