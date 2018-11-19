const db = require('_helpers/db');
const Roles = db.Roles;

module.exports = {
    getAll,
    create
};

async function getAll() {
    return await Roles.find().select('-hash');
}

async function create(param) {
    const roles = new Roles(param);
    await roles.save();
}