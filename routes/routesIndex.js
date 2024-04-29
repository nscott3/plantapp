const express = require('express');
const router = express.Router();

const homeRoutes = require('./home');
const addRoutes = require('./add');
const plantRoutes = require('./plant');

router.use('/', homeRoutes);
router.use('/', addRoutes);
router.use('/', plantRoutes);

module.exports = router;
