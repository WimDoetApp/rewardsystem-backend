const express = require('express');
const router = express.Router();
const finishedTaskService = require('./finished-task.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.get('/user/:id', getByUserId);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    finishedTaskService.getAll()
        .then(finishedTasks => res.json(finishedTasks))
        .catch(err => next(err));
}

function getById(req, res, next) {
    finishedTaskService.getById(req.params.id)
        .then(finishedTasks => finishedTasks ? res.json(finishedTasks) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByUserId(req, res, next) {
    finishedTaskService.getByUserId(req.params.userKey)
        .then(finishedTasks => finishedTasks ? res.json(finishedTasks) : res.sendStatus(404))
        .catch(err => next(err));
}

function create(req, res, next) {
    finishedTaskService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function update(req, res, next) {
    finishedTaskService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    finishedTaskService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}