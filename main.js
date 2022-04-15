/*
After setting up mysql server and loading database (refer to createdatabase.sql), 
make sure you have nodejs installed,
then open a new terminal in VSCode and run:

to install dependencies:
$ npm i

to run this program:
$ node main.js

    output:
    gkdub@Gabrielas-MacBook-Pro-2 actualproject % node main.js
    Connected!
    Result: [{"user_id":1,"email":"user1@gmail.com","username":"user1"},{"user_id":2,"email":"user2@gmail.com","username":"user2"},{"user_id":3,"email":"user3@gmail.com","username":"user3"}]

*/

const express = require('express')
const mysql = require('mysql')
const uuid = require('uuid')

const app = express();
const http = require('http');
// const httpServer = http.createServer(app);
// httpServer.on('error', err => winston.error(`Unexpected HTTP error: ${JSON.stringify(err, errorFieldsReplacer)}`));

const uid = uuid.v4();
console.log(`uuid: ${uid}`);

// const dbConnect = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'group8superpass',
//     database: 'group8'
// })

// dbConnect.connect(err => {
//     if (err) throw err;
//     console.log("Connected!");
// })

// const sampleQuery = 'SELECT * FROM users'

// dbConnect.query(sampleQuery, (err, result) => {
//     if (err) throw err;
//     console.log("Result: " + JSON.stringify(result));
// })

// Routes

const entry = require('./routes/entry.js');
const user = require('./routes/user.js');
const location = require('./routes/location');
//app.use('api/v1', )
app.use(express.json());
app.get('/entry/search', entry.searchEntries)
app.get('/entry/:id', entry.checkAuth)
app.post('/entry', entry.createEntry)
app.post('/entry/review/:id', entry.createReview)
//app.put('/entry/:id', entry.updateEntry),
app.delete('/entry/:id', entry.deleteEntry)
app.delete('/entry/review/:id', entry.deleteReview)

app.get('/user/:username', user.checkCredentials)

app.get('/locationprofile', location.getProfile)
app.post('/locationprofile', location.createProfile)


const start = () => {
    try {
        app.listen(5000)
    }
    catch (error) {
        console.log(error)
    }
}

start();