const db = require('../BD/connection')


// controladorCoinvestigador.js
exports.agregarCoinvestigador = async (req, res) => {
  const { uuid } = req.body;

  if (!uuid) {
    return res.status(400).json({ error: 'Falta el campo uuid' });
  }

  try {
    await db.query(
      `INSERT INTO coinvestigador (uuid) VALUES ($1)`,
      [uuid]
    );
    res.status(201).json({ mensaje: 'Registro agregado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
