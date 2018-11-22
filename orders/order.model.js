const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    reward: {
        name: { type: String, required: true },
        points: { type: Number, required: true }
    },
    userKey: { type: String, required: true },
    date: { type: Date, default: Date.now },
    isProcessed: {type: Boolean, default: false}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Order', schema);