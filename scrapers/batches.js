const getLogger = require('../utils/logger');

const WORKERS_COUNT = process.env.WORKER_PARALLELIZATION_COUNT;

const getBatches = (rawUrls) => {
  const logger = getLogger('BATCHES');
  const urls = [...rawUrls];

  logger.log(`Got ${urls.length} URLs`);

  const batchSize = Math.ceil(urls.length / WORKERS_COUNT);
  const batches = [];

  for (let i = 0; i < WORKERS_COUNT; i += 1) {
    batches.push(urls.slice(0, batchSize));
  }

  return batches;
};

module.exports = getBatches;
