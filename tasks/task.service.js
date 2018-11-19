const db = require('_helpers/db');
const Task = db.Task;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Task.find().select('-hash');
}

async function getById(id) {
    return await Task.findById(id).select('-hash');
}

async function create(taskParam) {
    const task = new Task(taskParam);
    
    await task.save();
}

async function update(id, taskParam) {
    const task = await Task.findById(id);

    if (!task) throw 'Task not found';

    Object.assign(task, taskParam);

    await task.save();
}

async function _delete(id) {
    await Task.findByIdAndRemove(id);
}