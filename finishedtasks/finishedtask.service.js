const config = require('config.json');
const db = require('_helpers/db');
const FinishedTask = db.FinishedTask;

module.exports = {
    getAll,
    getById,
    delete: _delete
};

async function getAll() {
    return await FinishedTask.find().select('-hash');
}

async function getById(id) {
    return await FinishedTask.findById(id).select('-hash');
}

async function _delete(id) {
    await FinishedTask.findByIdAndRemove(id);
}