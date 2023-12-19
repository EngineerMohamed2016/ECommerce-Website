const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    img: {
        type: String,
    },

    link: {
        type: String,
    },
});

module.exports = mongoose.model('slider', sliderSchema);