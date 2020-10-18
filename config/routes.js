const cubeControllers = require('../controllers/cube');
const accessoryControllers = require('../controllers/accessory');
const userControllers = require('../controllers/user');
const checkAuth = require('../middlewares/check-auth');


module.exports = (app) => {
    app.get('/', cubeControllers.getCubes),
        app.get('/login', checkAuth(false), userControllers.getLogin),
        app.post('/login', checkAuth(false), userControllers.postLogin),

        app.get('/register', checkAuth(false), userControllers.getRegister),
        app.post('/register', checkAuth(false), userControllers.postRegister),
        app.get('/logout', checkAuth(true), userControllers.getLogout),

        app.get('/details/:id', cubeControllers.getCube),

        app.get('/create/accessory', checkAuth(true), accessoryControllers.createAccessoryGet),
        app.post('/create/accessory', checkAuth(true), accessoryControllers.createAccessoryPost),

        app.get('/edit/:id', checkAuth(true), cubeControllers.getEditCube),
        app.post('/edit/:id', checkAuth(true), cubeControllers.postEditCube),

        app.get('/delete/:id', checkAuth(true), cubeControllers.getDeleteCube),
        app.post('/delete/:id', checkAuth(true), cubeControllers.postDeleteCube),

        app.get('/attach/accessory/:id', checkAuth(true), accessoryControllers.attachAccessoryGet),
        app.post('/attach/accessory/:id', checkAuth(true), accessoryControllers.attachAccessoryPost),

        app.post('/create', checkAuth(true), cubeControllers.postCreateCube),
        app.get('/create', checkAuth(true), cubeControllers.getCreateCube),
        app.get('/about', function (req, res) {
            res.render('about');
        }),
        app.get('*', function (req, res) {
            res.render('404')
        })
};