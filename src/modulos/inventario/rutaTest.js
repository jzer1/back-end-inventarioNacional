const express = require('express');
const router = express.Router();
const pool = require('../../BD/connection'); // ✔️ Ruta correcta

router.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1 + 1 AS solution'); // ✔️ Usa pool.query
    res.json({ conectado: true, solution: result[0].solution });
  } catch (err) {
    console.error("Error de BD:", err);
    res.status(500).json({ conectado: false, error: err.message });
  }
});
console.log(typeof pool); // Debería ser "object"
console.log(pool.query); // Debería mostrar [Function: query]

module.exports = router;