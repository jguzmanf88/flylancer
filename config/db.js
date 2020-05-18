const Sequelize = require('sequelize');

//a2hosting
module.exports = new Sequelize('jfguzman_teo', 'jfguzman_debraye', 'WSA4QoZZ7ley', {
    host: '68.66.224.5',
    port: '5432',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
    // define: {
    //     timestamps: false
    // }
    //para no ver todo el código de bd en la consola
    //logging: false
});