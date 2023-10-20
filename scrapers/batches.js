const getLogger = require('../utils/logger');

const WORKERS_COUNT = process.env.WORKER_PARALLELIZATION_COUNT;

const getBatches = (rawUrls) => {
  const logger = getLogger('BATCHES');
  const urls = [...rawUrls];

  logger.log(`Got ${urls.length} URLs`);

  const batchSize = Math.ceil(urls.length / WORKERS_COUNT);
  const batches = [];

  for (let i = 0; i < WORKERS_COUNT; i += 1) {
    logger.log(`Batch ${i} from index ${i * batchSize}`);
    batches.push(urls.slice(i * batchSize, i * batchSize + batchSize));
  }

  return batches;
};

module.exports = getBatches;
