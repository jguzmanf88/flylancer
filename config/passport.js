const passport = require('passport');
const LocalStrategy = require('passport-local'); //permite iniciar sesion
const Usuarios = require('../models/Usuarios');

passport.use(new LocalStrategy({ //mapeo para ver que coampos usan para sesion
        usernameField: 'email',
        passwordField: 'password'
    },

    async(email, password, next) => {
        //una vez que llenas los campos de inicar sesion estás aquí
        const usuario = await Usuarios.findOne({ where: { email } }); //email : email , puede ir igual

        //revisar si existe le usuario
        if (!usuario) return next(null, false, {
            message: 'No existe el usuario'
        });
        //usuario exist
        const verificarPass = usuario.validarPassword(password);

        //si password incorrecto
        if (!verificarPass) return next(null, false, {
            message: 'Password incorrecto'
        });

        //si pasa aquí, es que el usuario existe
        return next(null, usuario);
    }
))

passport.serializeUser(function(usuario, cb) {
    cb(null, usuario);
});

passport.deserializeUser(function(usuario, cb) {
    cb(null, usuario);
});

module.exports = passport;