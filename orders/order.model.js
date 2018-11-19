const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    rewardKey: { type: String, required: true },
    userKey: { type: String, required: true },
    date: { type: Date, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Order', schema);