const cubeControllers = require('../controllers/cube');
const accessoryControllers = require('../controllers/accessory');


module.exports = (app) => {
    app.get('/', cubeControllers.getCubes),
    app.get('/details/:id', cubeControllers.getCube),

    app.get('/create/accessory', accessoryControllers.createAccessoryGet),
    app.post('/create/accessory', accessoryControllers.createAccessoryPost),

    app.get('/attach/accessory/:id', accessoryControllers.attachAccessoryGet),
    app.post('/attach/accessory/:id', accessoryControllers.attachAccessoryPost),

    app.post('/create', cubeControllers.createCubePost),
    app.get('/create', cubeControllers.createCubeGet),
    app.get('/about', function(req, res){
        res.render('about');
    }),
    app.get('*', function(req,res){
        res.render('404')
    })
};