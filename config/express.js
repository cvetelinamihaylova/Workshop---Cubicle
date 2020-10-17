const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth'); 


module.exports = (app) => {
    app.engine('.hbs', handlebars({
        extname: '.hbs'
    }));
    app.set('view engine', '.hbs');

    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(auth);

    const staticFilePath = path.join(global._basedir, 'static');
    app.use(express.static(staticFilePath));

    app.use(function(err, req, res, next){
        if(err.message == 'BAD_REQUEST'){
            res.status(400);
            return;
        }
    })
};