const express = require('express');
const router = express.Router();

// controllers 
const { getMobiles, getMobile, getLatest, editMobile, deleteMobile, addMobile } = require('../../controllers/product/mobiles-controllers');

const verifyAdminTokenMiddleware = require('../../middleware/verifyAdmin');

// routes
router.get('/', getMobiles);
router.get('/latest', getLatest);
router.get('/:id', getMobile);
// for dashboard project
router.patch('/:id', verifyAdminTokenMiddleware, editMobile);
router.delete('/:id', verifyAdminTokenMiddleware, deleteMobile);
router.post('/', verifyAdminTokenMiddleware, addMobile);


module.exports = router;