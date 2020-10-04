const cubeControllers = require('../controllers/cube');

module.exports = (app) => {
    app.get('/', cubeControllers.getCubes),
    app.get('/details/:id', cubeControllers.getCube),
    app.post('/create', cubeControllers.createCubePost),
    app.get('/create', cubeControllers.createCubeGet),
    app.get('/about', function(req, res){
        res.render('about', {layout: false});
    }),
    app.get('*', function(req,res){
        res.render('404', {layout: false})
    })
};