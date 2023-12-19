const MobsCollection = require('../../models/products/mobile-model');
const { StatusCodes } = require('http-status-codes');
const filterNumeric = require('../../utils/filter-numeric');
const filterRange = require('../../utils/filter-range');

const getMobiles = async (req, res) => {
    const filterObj = {};
    const { brand, year, screenSize, ram, screensize, os, hexcolor, numeric, priceRange, search } = req.query;

    if (brand)
        filterObj.brand = brand.split(',');

    if (year)
        filterObj.date = { $regex: year.split(',').join('') };

    if (screenSize)
        filterObj.screenSize = screenSize.split(',').join('');

    if (ram)
        filterObj.ram = ram.split(',');

    if (screensize)
        filterObj.screenSize = screensize.split(',');

    if (os)
        filterObj.os = os.split(',');

    if (hexcolor)
        filterObj.colorsHex = `#${hexcolor.split(',').join('')}`;

    if (numeric) {
        const numeric_filter_keys = numeric.split(','); 
        filterNumeric(numeric_filter_keys, filterObj);
    }

    if (priceRange) {
        const range_filter_keys = priceRange.split(','); // [ 'min=3', 'max=4' ]
        filterRange(range_filter_keys, filterObj);
    }

    if (search)
        filterObj.name = { $regex: search, $options: 'i' };


    let allProdcuts = await MobsCollection.find(filterObj);

    res.send(allProdcuts);
}

const getMobile = async (req, res) => {
    const { id: mobID } = req.params;
    const mobile = await MobsCollection.findOne({ _id: mobID });

    res.status(200).json(mobile);
}

const getLatest = async (req, res) => {
    const latestMob = await MobsCollection.find().sort('createdAt').limit(1);

    res.status(200).json(latestMob);
}

const editMobile = async (req, res) => {
    const editedMob = await MobsCollection.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true, new: true })
    res.status(StatusCodes.OK).json({ msg: 'Edit Done Successfully', editedMob });
}

const deleteMobile = async (req, res) => {
    const deletedMob = await MobsCollection.findOneAndRemove({ _id: req.params.id })
    res.status(StatusCodes.OK).json({ msg: 'Deleted Successfully', deletedMob });
}

const addMobile = async (req, res) => {
    const { brand, name, price, os, memory, ram, imgUrl } = req.body;
    const newMob = { brand, name, price, os, memory, ram, images: [{ path: imgUrl }] }
    const addedMob = await MobsCollection.create(newMob)
    res.status(StatusCodes.OK).json({ msg: 'Added Successfully', addedMob });
}

module.exports = { getMobiles, getMobile, getLatest, editMobile, deleteMobile, addMobile };