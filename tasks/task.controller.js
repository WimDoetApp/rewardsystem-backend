const express = require('express');
const router = express.Router();
const taskService = require('./task.service');

// routes
router.get('/', getAll);
router.post('/', create);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    taskService.getAll()
        .then(tasks => res.json(tasks))
        .catch(err => next(err));
}

function create(req, res, next) {
    taskService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getById(req, res, next) {
    taskService.getById(req.params.id)
        .then(tasks => tasks ? res.json(tasks) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    taskService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    taskService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}