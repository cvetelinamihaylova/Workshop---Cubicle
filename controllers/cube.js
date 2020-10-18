const cubeModel = require('../models/cube');

module.exports = {
    getCubes(req, res, next) {
        const { from, search, to } = req.query;
        const query = {};
        if (search) { query.name = new RegExp(search, 'i') }
        if (from) {
            query.difficultyLevel = { $gte: +from }
        }
        if (to) {
            query.difficultyLevel = query.difficultyLevel || {};
            query.difficultyLevel = { $lte: +to }
        }

        cubeModel.find(query)
            .populate('accessories')
            .then((cubes) => {
                res.render('index', { cubes, from, search, to });
            })
            .catch(next);
    },
    getCube(req, res, next) {
        const id = req.params.id;
        cubeModel.findById(id)
            .populate('accessories')
            .then(cube => {
                res.render('details', { cube })
            })
            .catch(next);
    },
    postCreateCube(req, res, next) {
        const { name, description, imageURL, difficultyLevel } = req.body;

        cubeModel.create({ name, description, imageURL, difficultyLevel: +difficultyLevel })
            .then(() => {
                res.redirect('/');
            })
            .catch(next);
    },
    getCreateCube(req, res, next) {
        res.render('create')
    },
    postEditCube(req, res, next) {
        const id = req.params.id;
        const { name, description, imageURL, difficultyLevel } = req.body;

        cubeModel.update({ _id: id }, { name, description, imageURL, difficultyLevel: +difficultyLevel })
            .then(() => {
                res.redirect('/');
            })
            .catch(next);
    },
    getEditCube(req, res, next) {
        const id = req.params.id;
        cubeModel.findById(id)
            .then(cube => {
                res.render('edit-cube', cube)
            })
            .catch(next);
    },
    getDeleteCube(req, res, next) {
        const id = req.params.id;
        cubeModel.findById(id)
            .then(cube => {
                res.render('delete-cube', cube)
            })
            .catch(next);
    },
    postDeleteCube(req, res, next) {
        const id = req.params.id;

        cubeModel.deleteOne({ _id: id })
            .then(() => {
                res.redirect('/');
            })
            .catch(next);
    }
};