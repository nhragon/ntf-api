const express = require('express');
const adminController = require('../controllers/admin.controller');

const router = express.Router();

router.post('/login-torus', adminController.loginTorus);

module.exports = router;
