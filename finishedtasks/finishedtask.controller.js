const express = require('express');
const router = express.Router();
const finishedTaskService = require('./finishedtask.service');

// routes
router.get('/', getAll);
router.post('/', create);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    finishedTaskService.getAll()
        .then(finishedtasks => res.json(finishedtasks))
        .catch(err => next(err));
}

function create(req, res, next) {
    finishedTaskService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getById(req, res, next) {
    finishedTaskService.getById(req.params.id)
        .then(finishedtasks => finishedtasks ? res.json(finishedtasks) : res.sendStatus(404))
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