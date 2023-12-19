const express = require('express');
const router = express.Router();

const { getSlider } = require('../../controllers/product/slider-controllers.js');

router.get('/', getSlider);

module.exports = router;