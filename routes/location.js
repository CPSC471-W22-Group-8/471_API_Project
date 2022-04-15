
const mysql = require('mysql')
const db = require('../connect-promisify');

const LocationRoute = {
    async getProfile(req, res, next) {
        const q = req.query;
        const p = req.params;
        const b = req.body;

        console.log(`q = ${JSON.stringify(q)}, id = ${JSON.stringify(p)}, b = ${JSON.stringify(b)}`);
        if (!b.name) res.status(500).send('Invalid request.')
        else {
            const qString = 'SELECT * FROM `location_profiles` WHERE `name` = ' + mysql.escape(b.name)
            const results = await db.query(qString).catch(err => {throw err})
            if (!results) res.status(404).send('Location does not exist')
            else {
                if (results[0].name) {
                    res.status(200).send(results[0])
                }
                else {
                    res.status(404).send('Invalid request.')
                }
            }
        }
    },

    async createProfile(req, res, next) {
        const q = req.query;
        const p = req.params;
        const b = req.body;

        console.log(`q = ${JSON.stringify(q)}, id = ${JSON.stringify(p)}, b = ${JSON.stringify(b)}`);
        if (!b.name) res.status(500).send('Invalid request.')
        else {
            const check_admin = await db.query('select `admin_id` from `admins` where `admin_id` = ' + mysql.escape(b.admin_id)).catch(err => {throw err})
            if (!check_admin) {
                res.status(500).send('Invalid request.')
                return;
            }

            const qString = 'INSERT INTO `location_profiles`(`name`, `admin_id`, `regulations`) values (' 
            + mysql.escape(b.name) + ', ' +
            mysql.escape(b.admin_id) + ', ' +
            mysql.escape(b.regulations) + ')'
            const results = await db.query(qString).catch(err => {throw err})
            if (!results) res.status(404).send('Invalid request.')
            else {
                if (results) {
                    res.status(200).send(results)
                }
                else {
                    res.status(404).send('Invalid request.')
                }
            }
        }
    },

    async updateRegulations(req, res, next) {
        const q = req.query;
        const p = req.params;
        const b = req.body;

        console.log(`q = ${JSON.stringify(q)}, id = ${JSON.stringify(p)}, b = ${JSON.stringify(b)}`);
        if (!b.name || !b.requestor_id || !b.regulations) res.status(500).send('Invalid request.')
        else {
            const qString = 'SELECT * FROM `location_profiles` WHERE `name` = ' + mysql.escape(b.name) + 
                ' and `admin_id` = ' + mysql.escape(b.requestor_id)
            const results = await db.query(qString).catch(err => {throw err})
            if (!results) res.status(404).send('Unauthorized')
            else {
                if (results[0].name) {
                    const qString = 'update `location_profiles` set `regulations` = ' + mysql.escape(b.regulations)
                    ' WHERE `name` = ' + mysql.escape(b.name) +
                        ' and `admin_id` = ' + mysql.escape(b.requestor_id)
                    const results = await db.query(qString)
                    res.status(200).send(JSON.stringify(results))
                }
                else {
                    res.status(404).send('Invalid request.')
                }
            }
        }
    },

    async deleteProfile(req, res, next) {
        const q = req.query;
        const p = req.params;
        const b = req.body;

        console.log(`q = ${JSON.stringify(q)}, id = ${JSON.stringify(p)}, b = ${JSON.stringify(b)}`);
        if (!b.name || !b.requestor_id) res.status(500).send('Invalid request.')
        else {
            const qString = 'SELECT * FROM `location_profiles` WHERE `name` = ' + mysql.escape(b.name) +
                ' and `admin_id` = ' + mysql.escape(b.requestor_id)
            const results = await db.query(qString).catch(err => {throw err})
            if (!results) res.status(404).send('Unauthorized')
            else {
                if (results[0].name) {
                    const qString = 'delete from `location_profiles` WHERE `name` = ' + mysql.escape(b.name) +
                        ' and `admin_id` = ' + mysql.escape(b.requestor_id)
                    const results = await db.query(qString)
                    res.status(200).send(JSON.stringify(results))
                }
                else {
                    res.status(404).send('Invalid request.')
                }
            }
        }
    },
}

module.exports = LocationRoute