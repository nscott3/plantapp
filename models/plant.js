let mongoose = require('mongoose');

// Get the Schema class from mongoose
let Schema = mongoose.Schema;

// Define the schema for the plant model
let plantSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    dateTimeSeen: Date,
    location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], index: '2dsphere' }
    },
    description: String,
    plantSize: {
        height: Number,
        spread: Number
    },
    plantCharacteristics: {
        hasFlowers: Boolean,
        hasLeaves: Boolean,
        hasFruitsOrSeeds: Boolean,
        sunExposure: { type: String, enum: ['fullSun', 'partialShade', 'fullShade'] },
        flowerColor: String
    },
    identification: {
        name: String,
        status: { type: String, enum: ['completed', 'inProgress'] },
        dbpediaURI: String
    },
    photo: Buffer,
    userNickname: String,
    // chat: [{
    //     userNickname: String,
    //     message: String,
    //     timestamp: { type: Date, default: Date.now }
    // }]
});

// Configure the 'toObject' option for the schema to include getters
// and virtuals when converting to an object
plantSchema.set('toObject', { getters: true, virtuals: true });

// Create the mongoose model 'plant' based on the defined schema
let Plant = mongoose.model('plants', plantSchema);

// Export the plant model for use in other modules
module.exports = Plant;
