const express = require('express');
const router = express.Router();

// controllers 
const { getOverears, getOverear, getLatest, editOveraer, deleteOveraer, addOveraer } = require('../../controllers/product/overears-controllers');

const verifyAdminTokenMiddleware = require('../../middleware/verifyAdmin');

// routes
router.get('/', getOverears);
router.get('/latest', getLatest);
router.get('/:id', getOverear);
// for dashboard project
router.patch('/:id',verifyAdminTokenMiddleware, editOveraer);
router.delete('/:id',verifyAdminTokenMiddleware, deleteOveraer);
router.post('/',verifyAdminTokenMiddleware, addOveraer);

module.exports = router;