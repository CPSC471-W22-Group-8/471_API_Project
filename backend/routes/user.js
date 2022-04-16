
const mysql = require('mysql')
const db = require('../connect-promisify');

const EntryRoute = {
    async checkCredentials(req, res, next) {
        const q = req.query;
        const p = req.params;
        const b = req.body;
        // check if entry exists

        console.log(`q = ${JSON.stringify(q)}, id = ${JSON.stringify(p)}, b = ${JSON.stringify(b)}`);
        if (!p.username || !b.password) res.status(500).send('Invalid request.')
        else {
            const qString = 'SELECT * FROM `users` WHERE `username` = ' + mysql.escape(p.username) +
                ' and `password` = ' + mysql.escape(b.password)
            const results = await db.query(qString).catch(err => {console.log(err)})
            if (!results[0]) {
                res.status(404).send('User does not exist')
                return;
            }
            else {
                res.status(200).send(results[0].user_id)
           }
        }
    },

    async getUserInfo(req, res, next) {
        const q = req.query;
        const p = req.params;
        const b = req.body;
        // check if entry exists

        console.log(`q = ${JSON.stringify(q)}, id = ${JSON.stringify(p)}, b = ${JSON.stringify(b)}`);
        if (!p.id || !b.requestor_id) res.status(500).send('Invalid request.')
        else {
            const qString = 'SELECT * FROM `users` WHERE `user_id` = ' + mysql.escape(p.id)
            const results = await db.query(qString).catch(err => {throw err})
            if (!results) {
                res.status(404).send('Unauthorized')
            }
            else if (results[0].user_id != b.requestor_id) {
                res.status(404).send('Unauthorized')
            }
            else {
                res.status(200).send(results[0])
            
            }
        }
    },

    async updateEmail(req, res, next) {
        const q = req.query;
        const p = req.params;
        const b = req.body;
        // update email

        console.log(`q = ${JSON.stringify(q)}, id = ${JSON.stringify(p)}, b = ${JSON.stringify(b)}`);
        if (!p.id || !b.requestor_id || !b.email) res.status(500).send('Invalid request.')
        else {
            const qString = 'SELECT * FROM `users` WHERE `user_id` = ' + mysql.escape(p.id)
            const results = await db.query(qString).catch(err => {throw err})
            if (!results) {
                res.status(404).send('Unauthorized')
            }
            else if (results[0].user_id != b.requestor_id) {
                res.status(404).send('Unauthorized')
            }
            else {
                const qString = 'update `users` set `email` = ' + mysql.escape(b.email) +
                    ' WHERE `user_id` = ' + mysql.escape(p.id)
                const results = await db.query(qString).catch(err => {throw err})
                res.status(200).send(results)

            }
        }
    },
}

module.exports = EntryRoute