const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Reward: require('../rewards/reward.model'),
    Order: require('../orders/order.model'),
    Task: require('../tasks/task.model'),
    FinishedTask: require('../finished-tasks/finished-task.model'),
    Roles: require('../roles/roles.model')
};