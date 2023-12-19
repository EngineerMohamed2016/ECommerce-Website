const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
    id: {
        type: String,
    },

    name: {
        type: String,
        required: [true, 'laptop name was not provided!']
    },

    brand: {
        type: String,
        required: [true, 'laptop brand was not provided!']
    },

    os: {
        type: String,
        required: [true, 'laptop os was not provided!']
    },

    price: {
        type: Number,
        required: [true, 'laptop price was not provided!']
    },

    hardMemory: {
        type: String,
        required: [true, 'laptop hard capacity was not provided!']
    },


    hardType: {
        type: String,
        required: [true, 'laptop hard type was not provided!']
    },


    ram: {
        type: String,
        required: [true, 'laptop ram was not provided!']
    },

    screenSize: {
        type: String,
        default: 'screenSize-x'
    },

    wirelessType: {
        type: String,
        default: 'wirelessType-x'
    },

    cpuSpeed: {
        type: String,
        default: 'cpuSpeed-x'
    },

    cpuModel: {
        type: String,
        default: 'cpuModel-x'
    },

    cpuBrand: {
        type: String,
        default: 'cpuBramnd-x'
    },

    gpuModel: {
        type: String,
        default: 'gpuModel-x'
    },

    gpuBrand: {
        type: String,
        default: 'gpuBrand-x'
    },

    touch: {
        type: String,
        default: 'false'
    },

    about: {
        type: Array,
        default: [{
            "info": 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas vero debitis iste facilis tenetur nemo reprehenderit rerum dolore laboriosam, odio unde omnis a ad eos nobis soluta ducimus quia explicabo?'
        }]
    },

    images: {
        type: Array,
        required: [true, 'laptop images brand was not provided!']
    },

    images2: {
        type: Array,
    },

    colorsNames: {
        type: Array,
    },

    colorsHex: {
        type: [String],
        default:['#000000']
    },


}, { timestamps: true });

module.exports = mongoose.model('laptops', laptopSchema);