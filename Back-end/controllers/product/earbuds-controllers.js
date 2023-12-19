const EarbudsCollection = require('../../models/products/earbud-model');
const { StatusCodes } = require('http-status-codes');
const filterNumeric = require('../../utils/filter-numeric');
const filterRange = require('../../utils/filter-range');

// user will filter as prefers
const getEarbuds = async (req, res) => {
    const filterObj = {};
    const { brand, hexcolor, numeric, priceRange, search } = req.query;

    if (brand)
        filterObj.brand = brand.split(',');

    if (hexcolor)
        filterObj.colorsHex = `#${hexcolor.split(',').join('')}`;


    if (numeric) {
        const numeric_filter_keys = numeric.split(','); //  [ 'price>2' ]
        // creating ==> {  price: { '$gt': 2 }  }
        filterNumeric(numeric_filter_keys, filterObj);
    }

    if (priceRange) {
        // range ==> min=3,max=4
        const range_filter_keys = priceRange.split(','); // [ 'min=3', 'max=4' 
        // creating ==> { price: { '$gte': 120, '$lte': 130 } }
        filterRange(range_filter_keys, filterObj);
    }

    if (search)
        filterObj.name = { $regex: search, $options: 'i' };

    let allProdcuts = await EarbudsCollection.find(filterObj);

    // success
    res.send(allProdcuts);
}

// get one
const getEarbud = async (req, res) => {
    const { id: earbudID } = req.params;
    const earbud = await EarbudsCollection.findOne({ _id: earbudID });
    res.status(200).json(earbud);
}

// get latest
const getLatest = async (req, res) => {
    const latestEarbud = await EarbudsCollection.find().sort('createdAt').limit(1);

    res.status(200).json(latestEarbud);
}


// patch one
const editEarbud = async (req, res) => {
    const editedEar = await EarbudsCollection.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true, new: true })
    res.status(StatusCodes.OK).json({ msg: 'Edit Done Successfully', editedEar });
}

// delete one
const deleteEarbud = async (req, res) => {
    const deletedEar = await EarbudsCollection.findOneAndRemove({ _id: req.params.id })
    res.status(StatusCodes.OK).json({ msg: 'Deleted Successfully', deletedEar });
}

// add one
const addEarbud = async (req, res) => {
    const { brand, name, price, imgUrl } = req.body;
    const newEar = { brand, name, price, images: [{ path: imgUrl }] }
    const addedEar = await EarbudsCollection.create(newEar)
    res.status(StatusCodes.OK).json({ msg: 'Added Successfully', addedEar });
}

module.exports = { getEarbuds, getEarbud, getLatest, editEarbud, deleteEarbud, addEarbud };