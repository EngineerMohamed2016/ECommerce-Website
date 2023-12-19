const { StatusCodes } = require('http-status-codes');
const LapsCollection = require('../../models/products/laptop-model');
const filterNumeric = require('../../utils/filter-numeric');
const filterRange = require('../../utils/filter-range');

const getLaptops = async (req, res) => {
    const filterObj = {};
    const { brand, cpuspeed, hardcapacity, ram, screensize, os, cpubrand, hexcolor, numeric, priceRange, search } = req.query;

    if (search)
        filterObj.name = { $regex: search, $options: 'i' };

    if (brand)
        filterObj.brand = brand.split(',');

    if (cpuspeed)
        filterObj.cpuSpeed = cpuspeed.split(',');

    if (hardcapacity)
        filterObj.hardMemory = hardcapacity.split(',');

    if (ram)
        filterObj.ram = ram.split(',');

    if (screensize)
        filterObj.screenSize = screensize.split(',');

    if (os)
        filterObj.os = os.split(',');

    if (cpubrand)
        filterObj.cpuBrand = cpubrand.split(',');

    if (hexcolor) 
        filterObj.colorsHex = `#${hexcolor.split(',').join('')}`;
    
    if (numeric) {
        const numeric_filter_keys = numeric.split(',');
        filterNumeric(numeric_filter_keys, filterObj);
    }

    if (priceRange) {
        const range_filter_keys = priceRange.split(',');
        filterRange(range_filter_keys, filterObj);
    }

    if (search)
        filterObj.name = { $regex: search, $options: 'i' };

    let allProdcuts = await LapsCollection.find(filterObj);

    res.send(allProdcuts);
}

const getLaptop = async (req, res) => {
    const { id: lapID } = req.params;
    const laptop = await LapsCollection.findOne({ _id: lapID });

    res.status(200).json(laptop);
}

const getLatest = async (req, res) => {
    const latestLap = await LapsCollection.find().sort('createdAt').limit(1);

    res.status(200).json(latestLap);
}

const editLaptop = async (req, res) => {
    const editedLap = await LapsCollection.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true, new: true })
    res.status(StatusCodes.OK).json({ msg: 'Edit Done Successfully', editedLap });
}

const deleteLaptop = async (req, res) => {
    const deletedLap = await LapsCollection.findOneAndRemove({ _id: req.params.id })
    res.status(StatusCodes.OK).json({ msg: 'Deleted Successfully', deletedLap });
}

const addLaptop = async (req, res) => {
    const { brand, name, price, os, hardCap, hardType, ram, imgUrl } = req.body;
    const newLap = { brand, name, price, os, hardMemory: hardCap, hardType, ram, images: [{ path: imgUrl }] }
    const addedLap = await LapsCollection.create(newLap)
    res.status(StatusCodes.OK).json({ msg: 'Added Successfully', addedLap });
}
module.exports = { getLaptops, getLaptop, getLatest, editLaptop, deleteLaptop, addLaptop };