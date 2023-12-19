const VisasCollection = require('../../models/payment/payment-model');
const { StatusCodes } = require('http-status-codes');

async function storeVisa(req, res) {
    req.body.userID = req.account.accountID;
    await VisasCollection.create(req.body);
    res.status(StatusCodes.OK).json({ msg: 'visa has been stored successfully.' })
}

async function getVisas(req, res) {
    const uesrVisas = await VisasCollection.find({ userID: req.account.accountID })
    res.status(StatusCodes.OK).json(uesrVisas)
}

async function updateVisa(req, res) {
    await VisasCollection.findOneAndUpdate({ userID: req.account.accountID, _id: req.params.ID }, req.body, { new: true, runValidators: true });
    res.status(StatusCodes.OK).json({ msg: 'visa has been updated successfully.' })
}

async function deleteVisa(req, res) {
    await VisasCollection.findOneAndRemove({ userID: req.account.accountID, _id: req.params.ID })
    res.status(StatusCodes.OK).json({ msg: 'visa has been deleted successfully.' })
}

module.exports = { storeVisa, getVisas, updateVisa, deleteVisa };