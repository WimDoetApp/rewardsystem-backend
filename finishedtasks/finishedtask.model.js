const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    explanation: {type: String, required: true},
    date: {type: Date, required: true},
    userKey: {type: String, required: true},
    taskKey: {type: String, required: true}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('FinishedTask', schema);