
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
            const results = await db.query(qString).catch(err => {throw err})
            if (!results) res.status(404).send('User does not exist')
            else {
                if (results[0].user_id) {
                    res.status(200).send(results[0].user_id)
                }
                else {
                    res.status(404).send('Invalid request.')
                }
        }
    }
},
}

module.exports = EntryRoute