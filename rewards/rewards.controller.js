const express = require('express');
const router = express.Router();
const rewardService = require('./reward.service');

// routes
router.get('/', getAll);

module.exports = router;

function getAll(req, res, next) {
    rewardService.getAll()
        .then(rewards => res.json(rewards))
        .catch(err => next(err));
}