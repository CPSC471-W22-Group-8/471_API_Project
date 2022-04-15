
const mysql = require('mysql')
const db = require('../connect-promisify');
const dayjs = require('dayjs')
var shortid = require('shortid');

const GroupRoute = {

    async getGroupInfo(req, res, next) {
        const q = req.query;
        const p = req.params;
        const b = req.body;

        console.log(`q = ${JSON.stringify(q)}, id = ${JSON.stringify(p)}, b = ${JSON.stringify(b)}`);

        if (!p.id || !b.requestor_id) res.status(500).send('Invalid request.')
        else {
                // check groups
                // get rows where user id matches requestor and group id matches group id
                const user_groups = await db.query('select `user_id` from `user_groups` where `user_id` = ' + mysql.escape(b.requestor_id) + 
                    ' and `group_id` = ' + mysql.escape(p.id))
                if (!user_groups) {
                    res.status(404).send('Unauthorized')
                }
                else {
                    const group_data = await db.query('select * from `groups` where `group_id` = ' + mysql.escape(p.id))
                    if (!group_data) {
                        res.status(404).send('Group does not exist')
                    }
                    else {
                        res.status(200).send(group_data[0])
                    }
                }
           
        }
    },

    async createGroup(req,res,next) {
        const q = req.query;
        const p = req.params;
        const b = req.body;

        console.log(`q = ${JSON.stringify(q)}, id = ${JSON.stringify(p)}, b = ${JSON.stringify(b)}`);

        if (!b.requestor_id && !b.name) res.status(500).send('Invalid request.')
        else {
            const groupid = shortid.generate();
            const new_group = await db.query('insert into `groups`(`group_id`, `name`, `owner`) values (' + 
                mysql.escape(groupid) + ', ' +
                mysql.escape(b.name) + ', ' +
                mysql.escape(b.requestor_id) + ')').catch(err => {throw err});
            const add_user = await db.query('insert into `user_groups`(`user_id`, `group_id`) values (' +
                mysql.escape(b.requestor_id) + ', ' +
                mysql.escape(groupid) + ')').catch(err => {throw err});
            res.status(200).send('Success.')            
        }
    },

    async addUser(req, res, next) {
        const q = req.query;
        const p = req.params;
        const b = req.body;

        console.log(`q = ${JSON.stringify(q)}, id = ${JSON.stringify(p)}, b = ${JSON.stringify(b)}`);

        if (!b.user_id && !b.requestor_id && !p.id) res.status(500).send('Invalid request.')
        else {
            const user_groups = await db.query('select * from `groups` where `owner` = ' + mysql.escape(b.requestor_id) +
                ' and `group_id` = ' + mysql.escape(p.id))
            if (!user_groups[0]) {
                res.status(404).send('Unauthorized')
            }
            else {
                const add_user = await db.query('insert into `user_groups`(`user_id`, `group_id`) values (' +
                    mysql.escape(b.user_id) + ', ' +
                    mysql.escape(p.id) + ')')
                res.status(200).send('Success.') 

            }
        }
    },

    async deleteUser(req, res, next) {
        const q = req.query;
        const p = req.params;
        const b = req.body;

        console.log(`q = ${JSON.stringify(q)}, id = ${JSON.stringify(p)}, b = ${JSON.stringify(b)}`);

        if (!b.user_id && !b.requestor_id && !p.id) res.status(500).send('Invalid request.')
        else {
            const user_groups = await db.query('select * from `user_groups` where `user_id` = ' + mysql.escape(b.requestor_id) +
                ' and `group_id` = ' + mysql.escape(p.id))
            if (!user_groups[0]) {
                res.status(404).send('Unauthorized')
            }
            else {
                var qString = 'delete from `user_groups` where `user_id` = ' + mysql.escape(b.user_id) +
                    ' and `group_id` = ' + mysql.escape(p.id)
                const remove_user = await db.query(qString)
                res.status(200).send('Success.')

            }
        }
    },

    async deleteGroup(req, res, next) {
        const q = req.query;
        const p = req.params;
        const b = req.body;

        console.log(`q = ${JSON.stringify(q)}, id = ${JSON.stringify(p)}, b = ${JSON.stringify(b)}`);

        if (!b.requestor_id && !p.id) res.status(500).send('Invalid request.')
        else {
            const user_groups = await db.query('select * from `groups` where `owner` = ' + mysql.escape(b.requestor_id) +
                ' and `group_id` = ' + mysql.escape(p.id))
            if (!user_groups[0]) {
                res.status(404).send('Unauthorized')
            }
            else {
                var qString = 'delete from `groups` where `name` = ' + mysql.escape(user_groups[0].name)
                const delete_group = await db.query(qString)
                res.status(200).send('Success: ' + JSON.stringify(delete_group))

            }
        }
    },

}

module.exports = GroupRoute;
