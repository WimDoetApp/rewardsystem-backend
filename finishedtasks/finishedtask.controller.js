const express = require('express');
const router = express.Router();
const finishedTaskService = require('./finishedtask.service');

// routes
router.get('/', getAll);

module.exports = router;

function getAll(req, res, next) {
    finishedTaskService.getAll()
        .then(finishedtasks => res.json(finishedtasks))
        .catch(err => next(err));
}