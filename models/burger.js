var mysql = require('mysql');
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();
var PORT = 3000;
var exphbs = require("express-handlebars");
var connectionSQL = require('../config/connection.js');

// module.exports = function (app) {
var burgerFunctions =
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  connectionSQL.query("SELECT * FROM burgers", function(err, data) {
    if (err) {
      throw err;
    }
    res.json(data);
    // res.render("index", { movies: data });

  });
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

module.exports = burgerFunctions;