const express = require('express');
const router = express.Router();
const Plant = require('../models/plant');

// Add plant page route
router.get('/add', (req, res) => {
    res.render('add');
});

// Handle add plant form submission
router.post('/add', (req, res) => {
    const newPlant = new Plant({
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        description: req.body.description,
        size: req.body.size,
        characteristics: {
            flowers: req.body.flowers,
            leaves: req.body.leaves,
            fruits: req.body.fruits,
            sunExposure: req.body.sunExposure,
            flowerColor: req.body.flowerColor
        },
        identification: {
            name: req.body.name,
            status: req.body.status,
            dbpediaInfo: {
                commonName: req.body.commonName,
                scientificName: req.body.scientificName,
                description: req.body.description,
                uri: req.body.uri
            }
        },
        photo: req.body.photo,
        nickname: req.body.nickname,
        comments: []
    });

    newPlant.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
