const express = require('express');
const router = express.Router();
const taskService = require('./task.service');

// routes
router.get('/', getAll);

module.exports = router;

function getAll(req, res, next) {
    taskService.getAll()
        .then(tasks => res.json(tasks))
        .catch(err => next(err));
}