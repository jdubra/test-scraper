const { Router } = require('express');

const router = Router();

const { EventsService } = require('../services');

router.route('/')
  .get(async (req, res) => {
    try {
      const { query } = req;
      const events = await EventsService.getEvents(query);
      res.status(200).send(events);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

module.exports = router;