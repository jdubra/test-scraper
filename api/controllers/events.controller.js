const { Router } = require('express');

const router = Router();

const { EventsService } = require('../services');

router.get('/', async (req, res) => {
  try {
    const { query } = req;

    const { rows: events, count: totalCount } = await EventsService.getEvents(
      query,
    );

    res.status(200).send({ events, totalCount });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
