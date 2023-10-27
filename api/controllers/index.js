const { Router } = require('express');
const EventsController = require('./events.controller');

const router = Router();

router.use('/events', (_a, _b, next) => next(), EventsController);

module.exports = router;