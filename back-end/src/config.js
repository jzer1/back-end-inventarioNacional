require('dotenv').config();

module.exports = {
  app: {
    port: process.env.PORT || 4000,
  },
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASS: process.env.DB_PASS || 'Caracas1705*',
  DB_NAME: process.env.DB_NAME || 'inventario_forestal',
  DB_PORT: process.env.DB_PORT || 3306
};