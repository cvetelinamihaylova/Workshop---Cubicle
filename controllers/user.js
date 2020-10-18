const userModel = require('../models/user');
var jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
const { jwtSecret, authCookieName } = require('../config/config');
const signToken = promisify(jwt.sign);


module.exports = {
    getRegister(req, res) {
        res.render('register');
    },
    postRegister(req, res, next) {
        const { username, password, repeatPassword } = req.body;
        if (password !== repeatPassword) {
            res.render('register', { errorMessage: 'Passwords does not match!' });
            return;
        }

        userModel.create({ username, password })
            .then(() => { res.redirect('/login') })
            .catch(next);
    },
    getLogin(req, res) {
        res.render('login');
    },
    postLogin(req, res, next) {
        const { username, password } = req.body;
      
        userModel.findOne({ username })
          .then(user => Promise.all([user, user ? user.comparePasswords(password) : false]))
          .then(([user, match]) => {
            if (!match) {
              res.render('login', { errorMessage: 'Wrong username or password' });
              return;
            }
            return signToken({ userId: user._id }, jwtSecret);
          })
          .then(jwtToken => {
            res.cookie(authCookieName, jwtToken, { httpOnly: true });
            res.render('index');
          })
          .catch(next);
      }
}