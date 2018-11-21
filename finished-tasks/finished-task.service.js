const db = require('_helpers/db');
const FinishedTask = db.FinishedTask;
const jwtHelper = require('../_helpers/jwt');

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
    if (jwtHelper.getPermissions().includes('ORDER')) {
        const finishedTask = new FinishedTask(finishedTaskParam);

        await finishedTask.save();
    }
}

async function update(id, finishedTaskParam) {
    if (jwtHelper.getPermissions().includes('WRITE')) {
        const finishedTask = await FinishedTask.findById(id);

        if (!finishedTask) throw 'FinishedTask not found';

        Object.assign(finishedTask, finishedTaskParam);

        await finishedTask.save();
    }
}

async function _delete(id) {
    if (jwtHelper.getPermissions().includes('DELETE')) {
        await FinishedTask.findByIdAndRemove(id);
    }
}