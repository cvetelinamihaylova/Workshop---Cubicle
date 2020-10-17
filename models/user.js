const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = require('../config/config').saltRounds;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.comparePasswords = function (providedPass) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(providedPass, this.password, function (err, result) {
            if (err) { reject(err); return; }
            resolve(result);
        });
    });
};

userSchema.pre('save', function (done) {
    if (!this.isModified('password')) {
        done();
    };
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) { done(err); return; }
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) { done(err); return; }
            this.password = hash;
            done();
        });
    });
})

module.exports = new mongoose.model('User', userSchema);