const express = require('express');
const router = express.Router();
const rolesService = require('./roles.service');

// routes
router.get('/', getAll);
router.post('/', create);

module.exports = router;

function getAll(req, res, next) {
    rolesService.getAll()
        .then(roles => res.json(roles))
        .catch(err => next(err));
}

function create(req, res, next) {
    rolesService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}