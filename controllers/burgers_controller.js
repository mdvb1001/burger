// Require functions from the Model
var burgerFunctions = require("../models/burger.js");
// Export these awesome routes
module.exports = function (app) {
    // Get the root route
    app.get("/", function (req, res) {
        burgerFunctions.getUneaten(function (data) {
            var uneatenBurgers = data;
            console.log('All Burgers: ' + data);
            burgerFunctions.getDevoured(function (data) {
                res.render("index", {
                    burgers: uneatenBurgers,
                    devoured_burgers: data
                });
            });
        });
    });
    // Get the API route, which displays all burgers
    app.get("/api/burgers", function (req, res) {
        burgerFunctions.getAll(function (data) {
            res.json(data);
        });
    });
    // Get the API by ID route, which displays only one burger at a time
    app.get("/api/burgers/:id", function (req, res) {
        burgerFunctions.getBurgerById(req.params.id, function (data) {
            res.json(data);
        });
    });
    // Post for creating burger
    app.post('/', function (req, res) {
        var newBurg = req.body.burger;
        // Makes sure something is inputed
        if (newBurg !== "") {
            burgerFunctions.addBurger(newBurg, function () {
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    });
    // Defines the updates for when burgers are "devoured"
    app.put('/:id', function (req, res) {
        var selectBurg = req.params.id;
        burgerFunctions.devourBurger(selectBurg, function (data) {
            res.redirect('/');
        });
    });
};