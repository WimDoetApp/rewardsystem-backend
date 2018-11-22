require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt.jwt());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/rewards', require('./rewards/rewards.controller'));
app.use('/orders', require('./orders/orders.controller'));
app.use('/tasks', require('./tasks/tasks.controller'));
app.use('/finishedtasks', require('./finished-tasks/finished-tasks.controller'));
app.use('/roles', require('./roles/roles.controller'));

// global error handler
app.use(errorHandler);

// start server
//const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port);
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
