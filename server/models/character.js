const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({
    id: { type: String, required: true },
    characterName: { type: String, required: true },
    characterDescription: { type: String, required: true }
});

module.exports = mongoose.model('Character', characterSchema);