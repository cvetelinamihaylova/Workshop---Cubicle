module.exports = function checkAuth(shouldBeAuthenticated) {
    return function (req, res, next) {

        if ((shouldBeAuthenticated && !req.user) || (!shouldBeAuthenticated && req.user)) {
            res.redirect('/');
        }
        next();
    }
}