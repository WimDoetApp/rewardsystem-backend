const db = require('_helpers/db');
const Reward = db.Reward;
const jwtHelper = require('../_helpers/jwt');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Reward.find().select('-hash');
}

async function getById(id) {
    return await Reward.findById(id).select('-hash');
}

async function create(rewardParam) {
    if (jwtHelper.getPermissions().includes('CREATE')) {
        const reward = new Reward(rewardParam);

        await reward.save();
    }
}

async function update(id, rewardParam) {
    if (jwtHelper.getPermissions().includes('WRITE')) {
        const reward = await Reward.findById(id);

        if (!reward) throw 'Reward not found';

        Object.assign(reward, rewardParam);

        await reward.save();
    }
}

async function _delete(id) {
    if (jwtHelper.getPermissions().includes('DELETE')) {
        await Reward.findByIdAndRemove(id);
    }
}