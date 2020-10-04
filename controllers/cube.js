const cubeModel = require('../models/cube');

module.exports = {
    getCubes(req, res, next) {
        const { from, search, to} = req.query;
        cubeModel.getAll({name: search, from: +from, to: +to}).then(cubes => {
            res.render('index', { layout: false, cubes, from, search, to });
        })
            .catch(next);
    },
    getCube(req, res, next) {
        const id = +req.params.id;
        cubeModel.findById(id).then(cube => {
            res.render('details', { layout: false, cube })
        })
            .catch(next);
    },
    createCubePost(req, res, next) {
        const { name, description, imageURL, difficultyLevel } = req.body;
        cubeModel.insert(name, description, imageURL, +difficultyLevel)
            .then(() => res.redirect('/'))
            .catch(next);
    },
    createCubeGet(req, res, next) {
        res.render('create', { layout: false })
    }
}