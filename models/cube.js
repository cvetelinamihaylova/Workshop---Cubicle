const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageURL: String,
    difficultyLevel: Number,
    accessories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accessory'
    }]
});

module.exports = new mongoose.model('Cube', cubeSchema);