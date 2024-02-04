import { Environment } from './config/environment';
import server from './server/app';
import { logger } from './helpers/logger';
import { checkStreamExists, kinesis } from './modules/kinesis';

Environment.setup();

import { Application } from 'express';

import { config } from './config/config';

async function startServer() {
  const app: Application = await server.server();
  const streamName = 'eventStream';
  if (!await checkStreamExists(streamName)) {
    kinesis.createStream({ StreamName: streamName, ShardCount: 1 }, (err, data) => {
      if (err) {
        console.error(err);
        logger.error(err);
      }
      console.log(data);
    });
  }
  app.listen(config.SERVER_PORT, () => {
    console.log(`Listening on port ${config.SERVER_PORT} in ${config.NODE_ENV} mode`);
    logger.info(`Listening on port ${config.SERVER_PORT} in ${config.NODE_ENV} mode`);
  });
}

startServer();
