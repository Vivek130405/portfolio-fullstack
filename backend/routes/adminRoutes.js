const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const contactController = require('../controllers/contactController');

router.post('/login', adminController.login);

// Protected route to get messages
router.get('/messages', adminController.verifyToken, contactController.getMessages);

module.exports = router;
