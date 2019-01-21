const mongoose = require('mongoose');
const dbconfig = require('./db_config');

module.exports = {
    connect: () => {
        mongoose.connect(dbconfig.uri, { useNewUrlParser: true ,useCreateIndex: true}, () => {

            console.log('Connect to the mongodb cloud!');

        });
    }
}