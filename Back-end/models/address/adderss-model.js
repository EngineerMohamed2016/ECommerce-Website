const mongoose = require('mongoose');

const userAddressSchema = new mongoose.Schema({
    country: {
        type: String,
        required: [true, 'Please, provide a country!!'],
    },

    fullName: {
        type: String,
        required: [true, 'Please, provide a full name!!'],
        minlength: 3,
    },

    mobileNumber: {
        type: String,
        required: [true, 'Please, provide a mobile number!!'],
        minlength: 11,
    },

    mobileNumber: {
        type: String,
        required: [true, 'Please, provide a mobile number!!'],
        minlength: 10,
    },

    streetName: {
        type: String,
        required: [true, 'Please, provide a street name!!'],
        minlength: 5,
    },

    buildName: {
        type: String,
        required: [true, 'Please, provide a build name!!'],
        minlength: 5,
    },

    city: {
        type: String,
        required: [true, 'Please, provide a city name!!'],
        minlength: 3,
    },

    userID: {
        type: mongoose.Types.ObjectId,
        ref: "xperia-users",
    }
});



module.exports = mongoose.model('users-addresses', userAddressSchema);