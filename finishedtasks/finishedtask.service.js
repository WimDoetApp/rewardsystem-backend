const config = require('config.json');
const db = require('_helpers/db');
const FinishedTask = db.FinishedTask;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await FinishedTask.find().select('-hash');
}

async function create(userParam) {
    const finishedTask = new FinishedTask(userParam);
    await finishedTask.save();
}

async function getById(id) {
    return await FinishedTask.findById(id).select('-hash');
}

async function update(id, userParam) {
    const finishedTask = await FinishedTask.findById(id);

    if (!finishedTask) throw 'FinishedTask not found';

    Object.assign(finishedTask, userParam);

    await finishedTask.save();
}

async function _delete(id) {
    await FinishedTask.findByIdAndRemove(id);
}