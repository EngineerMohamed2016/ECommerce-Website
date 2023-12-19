const express = require('express');
const router = express.Router();

// controllers 
const { storeAddress, getAddresses, updateAddress, deleteAddress } = require('../../controllers/address/address-controllers');

const verifyUserTokenMiddleware = require('../../middleware/verifyUser');

// routes
router.post('/', verifyUserTokenMiddleware, storeAddress);
router.get('/', verifyUserTokenMiddleware, getAddresses);
router.patch('/:ID', verifyUserTokenMiddleware, updateAddress);
router.delete('/:ID', verifyUserTokenMiddleware, deleteAddress);

module.exports = router;