// Import the plant model
const plantModel = require('../models/plant');

// Function to create new todos
exports.create = function (userData) {
    console.log('userData', userData);
    let plant = new plantModel({
        description: userData.description,
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

