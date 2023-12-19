const express = require('express');
const router = express.Router();

// controllers 
const { getLaptops, getLaptop, getLatest, editLaptop, deleteLaptop, addLaptop } = require('../../controllers/product/laptops-controllers');

const verifyAdminTokenMiddleware = require('../../middleware/verifyAdmin');

// routes
router.get('/', getLaptops);
router.get('/latest', getLatest);
router.get('/:id', getLaptop);
// for dashboard project
router.patch('/:id',verifyAdminTokenMiddleware, editLaptop);
router.delete('/:id',verifyAdminTokenMiddleware, deleteLaptop);
router.post('/',verifyAdminTokenMiddleware, addLaptop);

module.exports = router;