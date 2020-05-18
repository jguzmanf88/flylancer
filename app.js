const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const passport = require('./config/passport');
const path = require('path'); //permite acceder la ruta actual
const router = require('./routes/index');
const back = require('express-back');

const hbs = require('hbs');
require('./hbs/home');

//ubicación de vistas
app.set('views', path.join(__dirname, './views'));
// Static folder
app.use(express.static(__dirname + '/public'))

// Express HBS engine 
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
// app.set('view options', { layout: false });

// // Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//variables de desarrollo
require('dotenv').config({ path: 'vars.env' });

//validación con bastantes funciones
app.use(expressValidator());

//hailitar cooker parser
app.use(cookieParser());

// //habilitar y crear session
app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false
}))

//incilizar passport
app.use(passport.initialize());
app.use(passport.session());

//agregar flash
app.use(flash());

//middleware propio (loegado, flash messahes, fecha actual)
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();
})

app.use(back());

// Routes
app.use("/", router);

// Port listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${ port }`);
});

// https
// app.get("*", function(req, res) {
//     res.redirect("https://" + req.headers.host + req.url);
// });