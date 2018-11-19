const express = require('express');
const router = express.Router();
const taskService = require('./task.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    taskService.getAll()
        .then(tasks => res.json(tasks))
        .catch(err => next(err));
}

function getById(req, res, next) {
    taskService.getById(req.params.id)
        .then(tasks => tasks ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    taskService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}