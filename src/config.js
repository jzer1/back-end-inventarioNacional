require('dotenv').config();

module.exports = {
  app: {
    port: process.env.PORT || 4000,
  },
  DATABASE_URL: process.env.DATABASE_URL
};
