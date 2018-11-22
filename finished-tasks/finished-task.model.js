const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userKey: {type: String, required: true},
    task: {
        name: {type: String, required: true},
        points: {type: Number, required: true}
    },
    explanation: {type: String, required: true},
    isApproved: {type: Boolean, required: false},
    date: {type: Date, default: Date.now}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('FinishedTask', schema);