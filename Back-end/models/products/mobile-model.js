const mongoose = require('mongoose');

const mobileSchema = new mongoose.Schema({
    id: {
        type: String,
    },

    name: {
        type: String,
        required: [true, 'name was not provided!']
    },

    brand: {
        type: String,
        required: [true, 'brand was not provided!']
    },

    os: {
        type: String,
        required: [true, 'os was not provided!']
    },

    price: {
        type: Number,
        required: [true, 'price was not provided!']
    },

    cellTech: {
        type: String,
        default: 'cellTech-x'
    },


    memory: {
        type: String,
        required: [true, 'memory capacity was not provided!']
    },


    ram: {
        type: String,
        required: [true, 'ram was not provided!']
    },

    screenSize: {
        type: String,
        default: 'screenSize-x'
    },

    connectTech: {
        type: String,
        default: 'connectTech-x'
    },

    battery: {
        type: String,
        default: 'battery-x'
    },

    wirelessTech: {
        type: String,
        default: 'battery-x'
    },

    weight: {
        type: String,
        default: 'weight-x'
    },

    date: {
        type: String,
        default: 'date-x'
    },

    about: {
        type: Array,
        default: [{
            "info": 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas vero debitis iste facilis tenetur nemo reprehenderit rerum dolore laboriosam, odio unde omnis a ad eos nobis soluta ducimus quia explicabo?'
        }]
    },

    images: {
        type: Array,
        required: [true, 'images brand was not provided!']
    },

    images2: {
        type: Array,
    },

    colorsHex: {
        type: [String],
        default:['#000000']
    },

}, { timestamps: true });

module.exports = mongoose.model('mobiles', mobileSchema);