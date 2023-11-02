const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    counter1: {
        type: Number,
        required: true
    },
    counter2: {
        type: Number,
        required: true
    },
    counter3: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Event', eventSchema);
