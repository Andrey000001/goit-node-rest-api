const app = require('../../app');
const mongoose = require('mongoose');
const logger = require('../logger/logger');
require('dotenv').config();
const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .catch((error) => {
    logger.error('Error connecting to DB:', error);
    process.exit(1);
  });
