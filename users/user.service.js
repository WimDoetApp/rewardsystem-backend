﻿const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Role = db.Role;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        permissions = await getUserPermissions(user.roles);
        const token = jwt.sign({ sub: user.id, permissions: permissions }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

//permissions van de user ophalen
async function getUserPermissions(roles) {
    permissions = [];
    userRoles = [];

    for (let role of roles) {
        userRoles.push(await getPermissionsByRole(role));
    }

    for (let userRole of userRoles) {
        for (let permission of userRole.permissions) {
            permissions.push(permission);
        }
    }

    return removeDuplicates(permissions);
}

function removeDuplicates(arr) {
    let unique_array = arr.filter(function (elem, index, self) {
        return index == self.indexOf(elem);
    });
    return unique_array
}

async function getPermissionsByRole(role) {
    return await Role.findOne({ name: role }).select('permissions -_id');
}

//database functies
async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    if (!user) throw 'User not found';

    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}