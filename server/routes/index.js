const route = require('express').Router();
const itemRoutes = require('./itemRoutes');

route.use('/api', itemRoutes)

module.exports = route;