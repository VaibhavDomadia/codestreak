const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

/**
 * REST Endpoint: POST /admin/login
 */
router.post('/login', adminController.login);

module.exports = router;