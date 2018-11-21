const db = require('_helpers/db');
const Role = db.Role;
const jwtHelper = require('../_helpers/jwt');

module.exports = {
    getAll,
    create,
};

async function getAll() {
    return await Role.find().select('-hash');
}

async function create(roleParam) {
    if (jwtHelper.getPermissions().includes('CREATE')) {
        const role = new Role(roleParam);

        await role.save();
    }
}

async function test() {
    return await Role.find({ name: "WERKNEMER" }).select('-hash');
}