const AddressesCollection = require('../../models/address/adderss-model');
const { StatusCodes } = require('http-status-codes');

async function storeAddress(req, res) {
    req.body.userID = req.account.accountID;
    await AddressesCollection.create(req.body);
    res.status(StatusCodes.OK).json({ msg: 'address has been stored successfully.' })
}

async function getAddresses(req, res) {
    const userAddresses = await AddressesCollection.find({ userID: req.account.accountID })
    res.status(StatusCodes.OK).send(userAddresses)
}

async function updateAddress(req, res) {
    await AddressesCollection.findOneAndUpdate({ userID: req.account.accountID, _id: req.params.ID }, req.body,
        { new: true, runValidators: true }
    );
    res.status(StatusCodes.OK).json({ msg: 'address has been updated successfully.' })
}

async function deleteAddress(req, res) {
    await AddressesCollection.findOneAndRemove({ userID: req.account.accountID, _id: req.params.ID })
    res.status(StatusCodes.OK).json({ msg: 'address has been deleted successfully.' })
}

module.exports = { storeAddress, getAddresses, updateAddress, deleteAddress };