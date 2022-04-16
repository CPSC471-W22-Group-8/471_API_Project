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

const app = express();

// Routes

const entry = require('./routes/entry.js');
const user = require('./routes/user.js');
const location = require('./routes/location');
const group = require('./routes/group')
const bodyparser = require('body-parser')

//app.use(express.json());
var cors = require('cors');
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json())
app.use(express.json())
// use it before all route definitions
app.use(cors())
//app.use(cors({origin: '*'}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next();}
    )

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', `*`);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Api-Key, accept, authorization, X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Routes which have "for api" commented are duplicated routes for some 'get' based routes so that
// data can be passed in through the body of the http request, which get requests outside of postman don't allow

// Entry basics
<<<<<<< HEAD
app.get('/entry/search', entry.searchEntries)   // need to update
app.post('/entry/search', entry.searchEntries)   // FOR API
app.get('/entry/:id', entry.fetchEntryInfo)
app.get('/entry/data/:id', entry.fetchEntryInfo) // FOR API
app.post('/entry', entry.createEntry)   // need to update to add conditions, insects_caught, flies_used, figh_caught, pictures_entry
=======
app.get('/entry/search', entry.searchEntries)   // can update to add more params
app.post('/entry/search', entry.searchEntries)   // FOR API
app.get('/entry/:id', entry.fetchEntryInfo)
app.get('/entry/data/:id', entry.fetchEntryInfo) // FOR API
app.post('/entry', entry.createEntry)   // can update to add conditions, insects_caught, flies_used, figh_caught, pictures_entry
>>>>>>> aef71178701def8deb0f7924836bdfdd414f5a6c
app.post('/entry/review/:id', entry.createReview)
//app.put('/entry/:id', entry.updateEntry),
app.delete('/entry/:id', entry.deleteEntry)
app.delete('/entry/review/:id', entry.deleteReview)

app.get('/user/login/:username', user.checkCredentials)   // returns user_id to be used in subsequent queries
app.post('/user/login/:username', user.checkCredentials)    // FOR API
app.get('/user/:id', user.getUserInfo)
app.post('/user/:id', user.getUserInfo) // FOR API
//app.get('/user/statistics/:id', user.getStatistics)
app.put('/user/:id', user.updateEmail)

// Name of location profile will be passed in the body
<<<<<<< HEAD
app.get('/locationprofile', location.getProfile)    // update to add types_fish, hatches
app.post('/locationprofile/data', location.getProfile)   // FOR API
app.post('/locationprofile', location.createProfile)    // create profile (postman using)
=======
app.get('/locationprofile', location.getProfile)    // can update to add types_fish, hatches
app.post('/locationprofile/data', location.getProfile)   // FOR API
app.post('/locationprofile', location.createProfile)    // create profile (postman)
>>>>>>> aef71178701def8deb0f7924836bdfdd414f5a6c
app.post('/locationprofile/create', location.createProfile)    // create profile (FOR API)
app.put('/locationprofile/regulations', location.updateRegulations)
app.delete('/locationprofile', location.deleteProfile)

app.get('/group/:id', group.getGroupInfo)
app.post('/group/data/:id', group.getGroupInfo) // FOR API
app.post('/group', group.createGroup)
app.put('/group/user/:id', group.addUser)
app.delete('/group/user/:id', group.deleteUser)
app.delete('/group/:id', group.deleteGroup)

const start = () => {
    try {
        app.listen(5000)
    }
    catch (error) {
        console.log(error)
    }
}

start();