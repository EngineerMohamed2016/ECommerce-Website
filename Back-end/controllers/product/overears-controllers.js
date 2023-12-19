const OverearsCollection = require('../../models/products/overear-model');
const { StatusCodes } = require('http-status-codes');
const filterNumeric = require('../../utils/filter-numeric');
const filterRange = require('../../utils/filter-range');

const getOverears = async (req, res) => {
    const filterObj = {};
    const { brand, hexcolor, numeric, priceRange, search } = req.query;

    if (brand)
        filterObj.brand = brand.split(',');

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


    let allProdcuts = await OverearsCollection.find(filterObj);

    res.send(allProdcuts);
}

const getOverear = async (req, res) => {
    const { id: overearID } = req.params;
    const overear = await OverearsCollection.findOne({ _id: overearID });

    res.status(200).json(overear);
}

const getLatest = async (req, res) => {
    const latestOverear = await OverearsCollection.find().sort('createdAt').limit(1);

    res.status(200).json(latestOverear);
}

const editOveraer = async (req, res) => {
    const editedOver = await OverearsCollection.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true, new: true })
    res.status(StatusCodes.OK).json({ msg: 'Edit Done Successfully', editedOver });
}

const deleteOveraer = async (req, res) => {
    const deletedOver = await OverearsCollection.findOneAndRemove({ _id: req.params.id })
    res.status(StatusCodes.OK).json({ msg: 'Deleted Successfully', deletedOver });
}

const addOveraer = async (req, res) => {
    const { brand, name, price, imgUrl } = req.body;
    const newOver = { brand, name, price, images: [{ path: imgUrl }] }
    const addedOver = await OverearsCollection.create(newOver)
    res.status(StatusCodes.OK).json({ msg: 'Added Successfully', addedOver });
}
module.exports = { getOverears, getOverear, getLatest, addOveraer, deleteOveraer, editOveraer };