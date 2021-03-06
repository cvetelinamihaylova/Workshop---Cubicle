global._basedir = __dirname;
const config = require('./config/config');

const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);
const dbConnection = require('./config/database')(config.dbConnectionString);

dbConnection.then(()=>{
    app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
})