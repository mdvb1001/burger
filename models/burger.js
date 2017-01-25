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
    addBurger: function (burger, callback) {
        connectionSQL.query("INSERT INTO burgers (burger_name) VALUE (?)", [burger], function (err, data) {
            if (err) throw err;
            callback();
        });
    },
    devourBurger: function (callback) {}
};