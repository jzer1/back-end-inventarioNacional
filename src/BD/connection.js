const { Pool } = require('pg');
require('dotenv').config(); // Asegúrate de tener esto si usas variables de entorno

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Necesario para conexiones a Neon u otros servicios que requieren SSL
  },
});

module.exports = {
  query: async (sql, params) => {
    const client = await pool.connect();
    try {
      const res = await client.query(sql, params);
      return res.rows;
    } finally {
      client.release();
    }
  }
};
