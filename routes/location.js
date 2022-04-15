
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
}

module.exports = LocationRoute