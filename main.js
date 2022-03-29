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

const app = express()

const dbConnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'group8superpass',
    database: 'group8'
})

dbConnect.connect(err => {
    if (err) throw err;
    console.log("Connected!");
})

const sampleQuery = 'SELECT * FROM users'

dbConnect.query(sampleQuery, (err, result) => {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
})
