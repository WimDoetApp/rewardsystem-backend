const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Reward: require('../rewards/reward.model'),
    Task: require('../tasks/task.model'),
    FinishedTask: require('../finishedtasks/finishedtask.model'),
    Roles: require('../roles/roles.model')
};