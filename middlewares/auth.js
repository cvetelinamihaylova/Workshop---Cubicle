const jwt = require('jsonwebtoken');
const { authCookieName, jwtSecret, authHeaderName } = require('../config/config');

module.exports = function (req, res, next) {
    const token = req.cookies[authCookieName] || req.headers[authHeaderName];
    if (!token) { next(); return; }
    jwt.verify(token, jwtSecret, function (err, data) {
        if (err) { next(err); return; }
        req.user = { _id: decoded.userId };
        res.locals.isLogged = !!req.user;
        next();
    })
};