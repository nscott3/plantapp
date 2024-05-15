var express = require('express');
var router = express.Router();
var plantController = require('../controllers/plant')
var multer  = require('multer')

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

module.exports = router;
