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

app.use(express.json());

// Entry basics
app.get('/entry/search', entry.searchEntries)   // need to update
app.get('/entry/:id', entry.fetchEntryInfo)
app.post('/entry', entry.createEntry)   // need to update to add conditions, insects_caught, flies_used, figh_caught, pictures_entry
app.post('/entry/review/:id', entry.createReview)
//app.put('/entry/:id', entry.updateEntry),
app.delete('/entry/:id', entry.deleteEntry)
app.delete('/entry/review/:id', entry.deleteReview)

// Entry advanced
app.put('/entry')

app.get('/user/login/:username', user.checkCredentials)   // returns user_id to be used in subsequent queries
app.get('/user/:id', user.getUserInfo)
//app.get('/user/statistics/:id', user.getStatistics)
app.put('/user/:id', user.updateEmail)

// Name of location profile will be passed in the body
app.get('/locationprofile', location.getProfile)    // update to add types_fish, hatches
app.post('/locationprofile', location.createProfile)
app.put('/locationprofile/regulations', location.updateRegulations)
app.delete('/locationprofile', location.deleteProfile)

app.get('/group/:id', group.getGroupInfo)
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