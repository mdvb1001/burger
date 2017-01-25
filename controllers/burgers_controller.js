var burgerFunctions = require("../models/burger.js");
module.exports = function(app) {
    app.get("/", function(req, res) {
        burgerFunctions.getAll(function(data) {
            console.log('All Burgers: ' + data);
            res.render("index", {
                burgers: data
            });
        });
    });
    app.post('/', function(req, res) {
        var newBurg = req.body.burger;
        if (newBurg !== "") {
            burgerFunctions.addBurger(newBurg, function() {
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    });
};
