const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    roles: { type: [String], required: true},
    dateCreated: { type: Date, default: Date.now },
    points: {type: Number, required: true}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);