const express = require('express');
const router = express.Router();

// controllers 
const { storeVisa, getVisas, updateVisa, deleteVisa } = require('../../controllers/payment/payment-controllers');

const verifyUserTokenMiddleware = require('../../middleware/verifyUser');

// routes
router.post('/', verifyUserTokenMiddleware, storeVisa);
router.get('/', verifyUserTokenMiddleware, getVisas);
router.patch('/:ID', verifyUserTokenMiddleware, updateVisa);
router.delete('/:ID', verifyUserTokenMiddleware, deleteVisa);



module.exports = router;