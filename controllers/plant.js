// Import the plant model
const plantModel = require('../models/plant');

// Function to create new todos
exports.create = function (userData, file) {
    console.log('userData', userData);
    let plant = new plantModel({
        dateTimeSeen: userData.dateTimeSeen,
        location: userData.location,
        description: userData.description,
        plantSize: {
            height: userData.plantSize.height,
            spread: userData.plantSize.spread
        },
        plantCharacteristics: {
            hasFlowers: userData.plantCharacteristics.hasFlowers,
            hasLeaves: userData.plantCharacteristics.hasLeaves,
            hasFruitsOrSeeds: userData.plantCharacteristics.hasFruitsOrSeeds,
            sunExposure: userData.plantCharacteristics.sunExposure,
            flowerColor: userData.plantCharacteristics.flowerColor
        },
        identification: {
            name: userData.identification.name,
            status: userData.identification.status,
            dbpediaURI: userData.identification.dbpediaURI
        },
        userNickname: userData.userNickname,
        photo: file.path
    });
    return plant.save().then(plant => {
        console.log(plant);

        return JSON.stringify(plant);
    }).catch(err => {
        // Log the error if saving fails
        console.log(err);

        // Return null in case of an error
        return null;
    });
};

// Function to get all todos
exports.getAll = function () {
    // Retrieve all todos from the database
    return plantModel.find({}).then(plants => {
        // Return the list of todos as a JSON string
        return JSON.stringify(plants);
    }).catch(err => {
        // Log the error if retrieval fails
        console.log(err);

        // Return null in case of an error
        return null;
    });
};

