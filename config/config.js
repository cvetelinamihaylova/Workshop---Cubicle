const config = {
    development: {
        port: process.env.PORT || 3000,
        dbConnectionString: 'mongodb://localhost:27017/test',
        authCookieName: 'auth_cookie',
        authHeaderName: 'auth',
        jwtSecret: 'secret',
        saltRounds: 10
    },
    production: {}
};

const env = process.env.NODE_ENV || 'development';
module.exports = config[env];