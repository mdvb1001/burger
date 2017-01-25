var mysql = require('mysql');
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();
var PORT = 3000;
var exphbs = require("express-handlebars");
var connectionSQL = require('../config/connection.js');
module.exports = { //
    // module.exports = function (app) {
    getAll: function (callback) {
        connectionSQL.query("SELECT * FROM burgers", function (err, data) {
            if (err) throw err;
            console.log('Here\'s DATA: ' + data);
            callback(data);
        });
    },
    getBurgerById: function (burgerId, callback) {
        connectionSQL.query('SELECT * FROM burgers WHERE id = ?', [burgerId], function (err, data) {
            if (err) throw err;
            callback(data);
        });
    },
    addBurger: function (input, callback) {
        connectionSQL.query("INSERT INTO burgers (burger_name) VALUE (?)", [input], function (err, result) {
            if (err) throw err;
            callback();
        });
    },
    devourBurger: function (burgerId, callback) {
        connectionSQL.query("UPDATE burgers SET devoured = ? WHERE id = ?", [1, burgerId], function (err, result) {
            if (err) throw err;
            console.log('Result: ' + result);
            callback();
        });
    }
};