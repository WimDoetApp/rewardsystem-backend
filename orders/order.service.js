const db = require('_helpers/db');
const Order = db.Order;
const jwtHelper = require('../_helpers/jwt');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Order.find().select('-hash');
}

async function getById(id) {
    return await Order.findById(id).select('-hash');
}

async function create(orderParam) {
    if (jwtHelper.getPermissions().includes('ORDER')) {
        const order = new Order(orderParam);

        await order.save();
    }
}

async function update(id, orderParam) {
    if (jwtHelper.getPermissions().includes('WRITE')) {
        const order = await Order.findById(id);

        if (!order) throw 'Order not found';

        Object.assign(order, orderParam);

        await order.save();
    }
}

async function _delete(id) {
    if (jwtHelper.getPermissions().includes('DELETE')) {
        await Order.findByIdAndRemove(id);
    }
}