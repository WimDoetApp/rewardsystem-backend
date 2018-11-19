const db = require('_helpers/db');
const Reward = db.Reward;

module.exports = {
    getAll
};

async function getAll() {
    return await Reward.find().select('-hash');
}