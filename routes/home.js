const express = require('express');
const router = express.Router();
const Plant = require('../models/plant'); // Assuming you have your Plant model defined in models/plant.js

// Home page route
router.get('/', (req, res) => {
    Plant.find({}, (err, plants) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { plants: plants });
        }
    });
});

module.exports = router;
