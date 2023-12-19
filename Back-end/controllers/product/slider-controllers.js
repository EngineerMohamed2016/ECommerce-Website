const SliderCollection = require('../../models/products/slider-model');


const getSlider = async (req, res) => {
    const slider = await SliderCollection.find({});
    res.status(200).json(slider);
}

module.exports = { getSlider };