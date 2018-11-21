const db = require('_helpers/db');
const Task = db.Task;
const jwtHelper = require('../_helpers/jwt');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    console.log(await Task.find().select('-hash'));
    return await Task.find().select('-hash');
}

async function getById(id) {
    return await Task.findById(id).select('-hash');
}

async function create(taskParam) {
    if (jwtHelper.getPermissions().includes('CREATE')) {
        const task = new Task(taskParam);

        await task.save();
    }
}

async function update(id, taskParam) {
    if (jwtHelper.getPermissions().includes('WRITE')) {
        const task = await Task.findById(id);

        if (!task) throw 'Task not found';

        Object.assign(task, taskParam);

        await task.save();
    }
}

async function _delete(id) {
    if (jwtHelper.getPermissions().includes('DELETE')) {
        await Task.findByIdAndRemove(id);
    }
}