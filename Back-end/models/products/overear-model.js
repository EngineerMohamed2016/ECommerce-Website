const mongoose = require('mongoose');

const overearSchema = new mongoose.Schema({
    id: {
        type: String,
    },

    name: {
        type: String,
        required: [true, 'overear name was not provided!']
    },

    brand: {
        type: String,
        required: [true, 'overear brand was not provided!']
    },

    price: {
        type: Number,
        required: [true, 'overear price was not provided!']
    },

    connectivity: {
        type: String,
        default: 'connectivity-x'
    },

    about: {
        type: Array,
        default: [{
            "info": 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas vero debitis iste facilis tenetur nemo reprehenderit rerum dolore laboriosam, odio unde omnis a ad eos nobis soluta ducimus quia explicabo?'
        }]
    },

    images: {
        type: Array,
        required: [true, 'overear images brand was not provided!']
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

module.exports = mongoose.model('overears', overearSchema);