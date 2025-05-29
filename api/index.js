const serverless = require('serverless-http');
const app = require('.././src/app');  // Importas tu app.js

module.exports = serverless(app);  // Lo adaptas al entorno serverless
