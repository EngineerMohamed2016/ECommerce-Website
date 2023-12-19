const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    productsCount: {
        type: String,
        required: [true, 'Please, provide a products count!!'],
    },

    totalPrice: {
        type: String,
        required: [true, 'Please, provide a products price!!'],
    },

    userID: {
        type: mongoose.Types.ObjectId,
        ref: "xperia-users",
    }

}, { timestamps: true });



module.exports = mongoose.model('xperia-transactions', transactionSchema);