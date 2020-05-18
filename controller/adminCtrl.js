const fs = require('fs'),
    fncts = require('./functions.js'),

    var data = "",
        param = "",
        erroresExpress = "",
        er = [];

/* Login */
exports.login = function(req, res) {
    res.render("login")
}

/* Logout */
exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}

/* Index */
exports.admin = function(req, res) {
    if (req.isAuthenticated()) {

        /* // Sync DB (Production) 
        db2.sequelize.sync({ force: true }).then(() => {
            console.log("Drop and re-sync db.");
        });
        /* Production */

        res.render('dashboard/index', {
            title: '| ' + "Admin",
        })
    } else {
        res.redirect('/app/login');
    }

};