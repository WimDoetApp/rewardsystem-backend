const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    key: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Reward', schema);