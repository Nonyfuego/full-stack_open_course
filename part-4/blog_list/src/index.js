const logger = require('./utils/logger');
const app = require('./app');
const config = require('./utils/config');

app.listen(config.PORT, () => {
  logger.info(`app listening on port ${config.PORT}`);
});
