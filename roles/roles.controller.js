const express = require('express');
const router = express.Router();
const roleService = require('./role.service');

// routes
router.get('/', getAll);
router.post('/', create);

module.exports = router;

function getAll(req, res, next) {
    roleService.getAll()
        .then(roles => res.json(roles))
        .catch(err => next(err));
}

function create(req, res, next) {
    roleService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}