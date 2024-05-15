var express = require('express');
var router = express.Router();
var plantController = require('../controllers/plant')

/* GET home page. */
// index.js
router.get('/', function(req, res, next) {
    let result = plantController.getAll()
    result.then(plants => {
        let data = JSON.parse(plants);
        console.log(data.length)
        res.render('index', { title: 'View All Plants', data: data});
    })
});

router.get('/insert', function(req, res, next) {
    res.render('insert', { title: 'Insert a Plant' });
});

// route to get all plants
router.get('/plants', function (req, res, next) {
    plantController.getAll().then(plants => {
        console.log(plants);
        return res.status(200).send(plants);
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
})

// route to add a new plant
router.post('/add-plant', function(req, res, next) {
    let data = req.body;
    console.log("Received a plant: " + data.description);
    // let filePath = req.file.path;
    plantController.create(data).then(plant => {
        console.log(plant);
        res.status(200).send(plant);
        // res.redirect('/');
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
});

module.exports = router;
