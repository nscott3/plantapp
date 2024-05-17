// Import the plant model
const plantModel = require('../models/plant');

// Function to create new todos
exports.create = function (userData, file) {
    console.log('userData', userData);
    let plant = new plantModel({
        dateTimeSeen: userData.dateTimeSeen,
        location: {
            type: userData.location.type,
            coordinates: [
                userData.location.latitude,
                userData.location.longitude
            ]
        },
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
        photo: file.path,
        suggestions: [],
        chats: []
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

// Function to get all plants
exports.getAll = function (filter = {}, sort = {}, geoNear = null) {
    let query;

    if (geoNear !== null) {
        // Use aggregation for geoNear
        query = plantModel.aggregate([
            {
                $geoNear: {
                    near: geoNear.near,
                    distanceField: geoNear.distanceField,
                    spherical: geoNear.spherical,
                    key: geoNear.key,
                    query: filter
                }
            },
            { $sort: sort }
        ]);
    } else {
        // Use find for filter and sort
        query = plantModel.find(filter).sort(sort);
    }

    // Retrieve all plants from the database
    return query.then(plants => {
        // Return the list of plants as a JSON string
        return JSON.stringify(plants);
    }).catch(err => {
        // Log the error if retrieval fails
        console.log(err);

        // Return null in case of an error
        return null;
    });
};

// Function to get one plant
exports.getOne = function (id) {
    // Retrieve one plant from the database
    return plantModel.findById(id).then(plant => {
        // Return the plant as a JSON string
        return JSON.stringify(plant);
    }).catch(err => {
        // Log the error if retrieval fails
        console.log(err);

        // Return null in case of an error
        return null;
    });
}

// Function to add suggestion for plant
exports.addSuggestion = function (id, suggestion) {
    // Retrieve one plant from the database
    return plantModel.findById(id).then(plant => {
        plant.suggestions.push(suggestion);
        return plant.save().then(plant => {
            // Return the plant as a JSON string
            return JSON.stringify(plant);
        }).catch(err => {
            // Log the error if saving fails
            console.log(err);

            // Return null in case of an error
            return null;
        });
    }).catch(err => {
        // Log the error if retrieval fails
        console.log(err);

        // Return null in case of an error
        return null;
    });
}

// Function to add suggestion for plant
exports.addChat = function (id, chat) {
    // Retrieve one plant from the database
    return plantModel.findById(id).then(plant => {
        plant.chats.push(chat);
        return plant.save().then(plant => {
            // Return the plant as a JSON string
            return JSON.stringify(plant);
        }).catch(err => {
            // Log the error if saving fails
            console.log(err);

            // Return null in case of an error
            return null;
        });
    }).catch(err => {
        // Log the error if retrieval fails
        console.log(err);

        // Return null in case of an error
        return null;
    });
}

// Function to accept suggestion to plant
exports.acceptSuggestion = function (id, suggestionId) {
    // Retrieve one plant from the database
    return plantModel.findById(id).then(plant => {
        plant.identification.name = plant.suggestions.id(suggestionId).name;
        plant.identification.dbpediaURI = plant.suggestions.id(suggestionId).dbpediaURI;
        plant.identification.status = 'completed';
        return plant.save().then(plant => {
            // Return the plant as a JSON string
            return JSON.stringify(plant);
        }).catch(err => {
            // Log the error if saving fails
            console.log(err);

            // Return null in case of an error
            return null;
        });
    }).catch(err => {
        // Log the error if retrieval fails
        console.log(err);

        // Return null in case of an error
        return null;
    });
}