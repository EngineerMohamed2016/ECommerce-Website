const express = require('express');
const router = express.Router();

// controllers 
const { getEarbuds, getEarbud, getLatest, editEarbud, deleteEarbud, addEarbud } = require('../../controllers/product/earbuds-controllers');

const verifyAdminTokenMiddleware = require('../../middleware/verifyAdmin');

// routes
router.get('/', getEarbuds);
router.get('/latest', getLatest);
router.get('/:id', getEarbud);
// for dashboard project
router.patch('/:id', verifyAdminTokenMiddleware, editEarbud);
router.delete('/:id', verifyAdminTokenMiddleware, deleteEarbud);
router.post('/', verifyAdminTokenMiddleware, addEarbud);

module.exports = router;