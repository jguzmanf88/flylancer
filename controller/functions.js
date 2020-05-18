const fs = require('fs'),
    db = require('../config/db');

/* Conexión a la base de datos */
exports.conectDB = function(param) {
    require(`../models/${ param }`);
    db.sync()
        .then(() => console.log('DB Ok'))
        .catch((error) =>
            console.log(error)
        );
}

/* Autencicar usuario */
exports.authent = function(req, res) {
    if (!req.isAuthenticated()) {
        res.redirect('/login');
    }
}

exports.writeJson = function(data, param) {
    var url = `public/files/${param}.json`;
    let data2 = JSON.stringify(data);
    fs.writeFileSync(url, data2);
}