const app = require('../app');
const logger = require('../logger/logger');
app.listen(3000, () => {
  logger.info('Server running on port 3000');
});
