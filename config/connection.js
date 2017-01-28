// Require mysql
var mysql = require("mysql");
// Connection setup in accordance to JAWSDB for Heroku setup
var connection;
if (process.env.JAWSDB_URL) {
    // If server detects the JAWSDB_URL environmental variable, then it connect
    // to it JAWSDB db.
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    // If the servers doesn't detect, then it will fall back on local db
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: process.env.PASSWORD || "",
        database: "burgers_db"
    });
}
// Set-up the connection + console.log the threadId
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});
// Export the connection
module.exports = connection;