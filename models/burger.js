// Require connection from connection.js
var connectionSQL = require('../config/connection.js');
// Export all of these functions so we can call them in controllers folder
module.exports = { //
    // Function to display all burgers in json format
    getAll: function (callback) {
        connectionSQL.query("SELECT * FROM burgers", function (err, data) {
            callback(data);
        });
    },
    // Function that queries all Uneaten burgers
    getUneaten: function (callback) {
        connectionSQL.query("SELECT * FROM burgers WHERE devoured = 0", function (err, data) {
            callback(data);
        });
    },
    // Function that queries all Devoured burgers
    getDevoured: function (callback) {
        connectionSQL.query("SELECT * FROM burgers WHERE devoured = 1", function (err, data) {
            callback(data);
        });
    },
    // Function that queries any burger by ID#
    getBurgerById: function (burgerId, callback) {
        connectionSQL.query('SELECT * FROM burgers WHERE id = ?', [burgerId], function (err, data) {
            if (err) throw err;
            callback(data);
        });
    },
    // Queries the db to create a burger
    addBurger: function (input, callback) {
        connectionSQL.query("INSERT INTO burgers (burger_name) VALUE (?)", [input], function (err, result) {
            if (err) throw err;
            callback();
        });
    },
    // Queries the db to update burger's "devoured" property
    devourBurger: function (burgerId, callback) {
        connectionSQL.query("UPDATE burgers SET devoured = ? WHERE id = ?", [1, burgerId], function (err, result) {
            if (err) throw err;
            console.log('Result: ' + result);
            callback();
        });
    }
};