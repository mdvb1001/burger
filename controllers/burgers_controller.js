var burgerFunctions = require("../models/burger.js");
module.exports = function (app) {
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
    app.get("/api", function (req, res) {
        burgerFunctions.getAll(function (data) {
            res.json(data);
        });
    });
    app.get("/api/:id", function (req, res) {
        burgerFunctions.getBurgerById(req.params.id, function (data) {
            res.json(data);
        });
    });
    app.post('/', function (req, res) {
        var newBurg = req.body.burger;
        if (newBurg !== "") {
            burgerFunctions.addBurger(newBurg, function () {
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    });
    app.put('/:id', function (req, res) {
        var selectBurg = req.params.id;
        burgerFunctions.devourBurger(selectBurg, function (data) {
            res.redirect('/');
        });
    });
};