const express = require('express');
const router = express.Router();
const rewardService = require('./reward.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    rewardService.getAll()
        .then(rewards => res.json(rewards))
        .catch(err => next(err));
}

function getById(req, res, next) {
    rewardService.getById(req.params.id)
        .then(reward => reward ? res.json(reward) : res.sendStatus(404))
        .catch(err => next(err));
}

function create(req, res, next) {
    rewardService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function update(req, res, next) {
    rewardService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    rewardService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}