const express = require('express');
const router = express.Router();

// controllers 
const { register, login, verifyUser, getMembers } = require('../../controllers/auth/auth-controllers');

const verifyUserTokenMiddleware = require('../../middleware/verifyUser');

// routes
router.post('/register', register);
router.post('/login', login);
router.get('/verify', verifyUserTokenMiddleware, verifyUser);
router.get('/members', getMembers);



module.exports = router;