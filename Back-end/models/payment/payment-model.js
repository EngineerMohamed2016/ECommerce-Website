const mongoose = require('mongoose');

const visaSchema = new mongoose.Schema({
    cardNumber: {
        type: String,
        required: [true, 'Please, provide a number on card!!'],
    },

    cardName: {
        type: String,
        required: [true, 'Please, provide a name on card!!'],
    },

    cvc: {
        type: String,
        required: [true, 'Please, provide a cvc of card!!'],
    },

    expirationMonth: {
        type: String,
        required: [true, 'Please, provide a expiration month!!'],
    },

    expirationYear: {
        type: String,
        required: [true, 'Please, provide a expiration year!!'],
    },

    userID: {
        type: mongoose.Types.ObjectId,
        ref: "xperia-users",
    }
});



module.exports = mongoose.model('xperia-visas', visaSchema);