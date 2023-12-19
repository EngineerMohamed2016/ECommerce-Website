const express = require('express');
const router = express.Router();

// controllers 
const { createTransaction, getTransactions } = require('../../controllers/transactions/transactions-controllers');

const verifyUserTokenMiddleware = require('../../middleware/verifyUser');

// routes
router.post('/', verifyUserTokenMiddleware, createTransaction);
router.get('/', getTransactions);



module.exports = router;