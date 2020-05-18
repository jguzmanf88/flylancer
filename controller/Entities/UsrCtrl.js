const Usuarios = require('../../models/Usuarios');
const enviarEmail = require('../../handler/email');
const db = require('../../config/db');

exports.formCrearCuenta = (req, res) => {
    res.render('signin')
}

exports.crearNuevaCuenta = async(req, res, next) => {
    db.sync().then(() => console.log('DB Ok')).catch((error) => console.log(error));
    const usuario = req.body;

    req.checkBody('confirmar', 'El password repetido no puede ir vacio').notEmpty();
    req.checkBody('confirmar', 'El password es diferente').equals(req.body.password);

    // Leer los errores de express
    const erroresExpress = req.validationErrors();
    var er = [];
    if (erroresExpress) {
        erroresExpress.forEach(element => {
            er.push(element.msg)
                //console.log(element.msg);
        });

        req.flash('error', er);
        er = [];
        //res.redirect('/crear-cuenta');
    }
    try {
        await Usuarios.create(usuario);

        //url de confirmación
        const url = `https://${req.headers.host}/confirm_account/${usuario.email}`;
        //enviar email
        await enviarEmail.enviarEmail({
            usuario,
            url,
            subject: 'Confirma tu cuenta',
            archivo: 'confirmar-cuenta'
        })

        // Flash message y redireccionar
        req.flash('exito', 'Hemos envíado un email, confirma tu cuenta');
        res.redirect('/app/login', {
            messages: req.flash('exito')
        });

    } catch (error) {
        const erroresSequelize = error.errors.map(err => err.message);

        //Solo usé aquí los errores de sequelize, los de express fueron afuera !!
        req.flash('error', erroresSequelize);
        res.redirect('/app/signin');
    }
}

//confirma suscripción
exports.confirmarCuenta = async(req, res, next) => {

    //verificar que el usuario existe
    const usuario = await Usuarios.findOne({ where: { email: req.params.correo } })


    //sino existe, redireccionar
    if (!usuario) {
        req.flash('error', 'No existe la cuenta');
        res.redirect('/app/signin');
        return next(); //detiene ejecución de middleware
    }
    //si exsite confirmar  
    usuario.activo = 1;
    usuario.save();
    req.flash('exito', 'La cuenta se ha confirmado');
    res.redirect('/login');

}