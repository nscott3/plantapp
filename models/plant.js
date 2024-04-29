const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    date: String,
    time: String,
    location: String,
    description: String,
    size: String,
    characteristics: {
        flowers: Boolean,
        leaves: Boolean,
        fruits: Boolean,
        sunExposure: String,
        flowerColor: String
    },
    identification: {
        name: String,
        status: String,
        dbpediaInfo: {
            commonName: String,
            scientificName: String,
            description: String,
            uri: String
        }
    },
    photo: String,
    nickname: String,
    comments: [{ nickname: String, comment: String, timestamp: String }]
});

module.exports = mongoose.model('Plant', plantSchema);
