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

async function getById(id) {
    return await FinishedTask.findById(id).select('-hash');
}

async function create(finishedTaskParam) {
    const finishedTask = new FinishedTask(finishedTaskParam);

    await finishedTask.save();
}

async function update(id, finishedTaskParam) {
    const finishedTask = await FinishedTask.findById(id);

    if (!finishedTask) throw 'FinishedTask not found';

    Object.assign(finishedTask, finishedTaskParam);

    await finishedTask.save();
}

async function _delete(id) {
    await FinishedTask.findByIdAndRemove(id);
}