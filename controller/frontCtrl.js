const fs = require('fs');

let data = "",
    nav = "",
    foot = "",
    contact = "";

function index(res, lang) {
    data = readFile(lang, "index");
    nav = readFile(lang, "nav");
    foot = readFile(lang, "foot");
    // res.send(data.emp[0].servs)
    res.render('index', {
        title: "",
        extStyle: "index",
        logoSup: "logo_bco",
        data: data,
        nav: nav,
        foot: foot
    })
}

function readFile(lang, file) {
    let rawdata = fs.readFileSync(`public/files/${ lang }/${ file }.json`),
        data = JSON.parse(rawdata);
    return data;
}

exports.inicio = function(req, res) {
    // res.send("nada")
    index(res, "es");
};

exports.extV = function(req, res) {
    var param = req.params.yyy,
        lang = req.params.xxx;

    if (param === 'inicio' || param === "index") {
        index(res, lang);
    } else {
        data = data = readFile(lang, param);
        foot = readFile(lang, "foot");
        contact = readFile(lang, "contact");

        // res.send(data)
        res.render('gen', {
            title: "",
            extStyle: param,
            data: data,
            foot: foot,
            contact: contact
        })
    }
};