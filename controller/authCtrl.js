const passport = require('../config/passport');

exports.authCtrl = passport.authenticate('local', {
    successRedirect: "/app/admin",
    failureRedirect: "/app/login",
})