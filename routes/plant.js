
const express = require('express');
const router = express.Router();
const Plant = require('../models/plant');

// Plant details route
router.get('/plant/:id', (req, res) => {
    Plant.findById(req.params.id, (err, plant) => {
        if (err) {
            console.log(err);
        } else {
            res.render('plant', { plant: plant });
        }
    });
});

// Handle adding a comment to a plant
router.post('/plant/:id/comment', (req, res) => {
    Plant.findById(req.params.id, (err, plant) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            const newComment = {
                nickname: req.body.nickname,
                comment: req.body.comment,
                timestamp: new Date().toLocaleString()
            };
            plant.comments.push(newComment);
            plant.save((err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/plant/' + req.params.id);
                }
            });
        }
    });
});

module.exports = router;
