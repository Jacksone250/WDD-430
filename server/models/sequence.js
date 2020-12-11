const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
   maxCharacterId: { type: String, required: true }
});

module.exports = mongoose.model('Sequence', sequenceSchema);