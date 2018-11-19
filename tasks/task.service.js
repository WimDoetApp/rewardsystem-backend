const config = require('config.json');
const db = require('_helpers/db');
const Task = db.Task;

module.exports = {
    getAll,
    getById,
    create,
    delete: _delete
};

async function getAll() {
    return await Task.find().select('-hash');
}

async function getById(id) {
    return await Task.findById(id).select('-hash');
}

async function create(userParam) {
    const task = new Task(userParam);
    await task.save();
}

async function _delete(id) {
    await Task.findByIdAndRemove(id);
}