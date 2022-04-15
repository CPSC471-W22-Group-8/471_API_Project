const mysql = require("mysql");
const util = require("util");
var connection;

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'group8superpass',
    database: 'group8'
});
// promise wrapper to enable async await with MYSQL
connection.query = util.promisify(connection.query).bind(connection);

// connect to the database
connection.connect(function (err) {
    if (err) {
        console.log("error connecting: " + err.stack);
        return;
    };
    console.log("connected as... " + connection.threadId);
});

module.exports = connection;