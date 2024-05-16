var express = require('express');
var router = express.Router();
var plantController = require('../controllers/plant')
var multer  = require('multer')
const { ObjectId } = require('mongodb');

// storage defines the storage options to be used for file upload with multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/uploads/');
    },
    filename: function (req, file, cb) {
        var original = file.originalname;
        var file_extension = original.split(".");
        // Make the file name the date + the file extension
        filename =  Date.now() + '.' + file_extension[file_extension.length-1];
        cb(null, filename);
    }
});
let upload = multer({ storage: storage });

/* GET home page. */
// index.js
router.get('/', function(req, res, next) {
    plantController.getAll().then(plants => {
        // Capture the search options from the query parameters
        const searchInput = req.query.searchInput;
        const identificationCompleted = req.query.identificationCompleted === 'true';
        const identificationNotCompleted = req.query.identificationNotCompleted === 'true';
        const hasFlowers = req.query.hasFlowers === 'true';
        const noFlowers = req.query.noFlowers === 'true';
        const hasLeaves = req.query.hasLeaves === 'true';
        const noLeaves = req.query.noLeaves === 'true';
        const hasFruitsOrSeeds = req.query.hasFruitsOrSeeds === 'true';
        const noFruitsOrSeeds = req.query.noFruitsOrSeeds === 'true';
        const sortOption = req.query.sortOption;
        plants = JSON.parse(plants);
        // Filter the plants based on the search options
        let filteredPlants = plants.filter(plant => {
            return searchInput === undefined || (plant.identification.name && plant.identification.name.toLowerCase().includes(searchInput.toLowerCase()));
        });

        // Sort the filtered plants based on the sort option
        if (sortOption === 'date') {
            filteredPlants.sort((a, b) => new Date(a.dateTimeSeen) - new Date(b.dateTimeSeen));
        } else if (sortOption === 'name') {
            filteredPlants.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === 'distance') {
            filteredPlants.sort((a, b) => a.location.coordinates - b.location.coordinates);
        }

        res.set('Cache-Control', 'no-cache');
        res.render('index', { title: 'View All Plants', data: filteredPlants});
    });

    // result.then(plants => {
    //     console.log(plants);
    //     let data = plants
    //     console.log(data.length)
    //     r
    // })
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
router.post('/add-plant', upload.single('photo'), function(req, res, next) {
    let data = req.body;
    let file = req.file;
    console.log("Received a plant: " + data.description);
    // let filePath = req.file.path;
    plantController.create(data, file).then(plant => {
        console.log(plant);
        res.status(200).send(plant);
        // res.redirect('/');
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
});

router.get('/plant/:id', function(req, res, next) {
    const objectId = new ObjectId(req.params.id);

    plantController.getOne(objectId).then(plant => {
        console.log(plant);
        res.render('plant', { title: 'Plant Details', data: JSON.parse(plant) });
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
});

module.exports = router;
