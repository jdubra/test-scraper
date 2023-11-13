const { deleteEventsCron } = require('./delete-events.cron');
const { fetchEventsCron } = require('./fetch-events.cron');

deleteEventsCron.start();
fetchEventsCron.start();