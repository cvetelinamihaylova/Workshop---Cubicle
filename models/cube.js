const path = require('path');

const BaseModel = require('./base');

class CubeModel extends BaseModel {

    constructor() {
        const filePath = path.join(global._basedir, '/config/database.json');
        super(filePath);

    }

    insert(name, description, imageURL, difficultyLevel) {

        return super.insert({ name, description, imageURL, difficultyLevel });
    }

    getAll(query) {
        if (!query) { return super.getAll() }
        const {name, from, to} = query;
        return super.queryBy(function(entry){
            return (name ? entry.name.includes(name) : true) &&
            (from ? entry.difficultyLevel >= from : true) &&
            (to ? entry.difficultyLevel <= to : true)
        })
    }
}

module.exports = new CubeModel();