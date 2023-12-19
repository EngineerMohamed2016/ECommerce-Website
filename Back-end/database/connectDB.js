const mongoose = require('mongoose');

function connectDB(uri) {
    return mongoose.connect(uri)
        .then(() => console.log('Connected to DB Successfully.'))
        .catch((e) => console.log(e.message));
}

module.exports = connectDB;