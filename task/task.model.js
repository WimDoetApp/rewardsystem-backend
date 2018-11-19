const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    key: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    points: {type: Number, required: true}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Task', schema);