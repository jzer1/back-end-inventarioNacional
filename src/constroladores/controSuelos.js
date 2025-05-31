const db = require('../BD/connection')

exports.obtenerTodosSuelo = async (req, res) => {
  try {
    const rows = await db.query('SELECT Id, Carbono, Color, Fertilidad from Suelo');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

exports.obtenerSuelo = async (req,res)=>{
        const { id } = req.params; 
    
        if (!id) {
            return res.status(400).json({ error: 'Falta el campo ' });
        }
      
    
        try {
          const rows = await db.query(  `SELECT s.Id, s.Carbono, s.Color, s.Fertilidad 
       FROM Suelo s 
       JOIN Sub_parcela sp ON s.IdSubParcela = sp.Id 
       JOIN Conglomerado c ON sp.IdConglomerado = c.Id 
       WHERE c.Id = $1;`, [id]);
          res.json(rows);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error del servidor' });
    }
}

exports.obtenerSubParcelaSuelo = async(req,res)=>{
    const { id, idPar } = req.params; 
    
    if (!id ||!idPar) {
        return res.status(400).json({ error: 'Falta el campo ' });
    }
  

    try {
      const rows = await db.query( `SELECT s.Id, s.Carbono, s.Color, s.Fertilidad 
       FROM Suelo s 
       JOIN Sub_parcela sp ON s.IdSubParcela = sp.Id 
       JOIN Conglomerado c ON sp.IdConglomerado = c.Id 
       WHERE c.Id = $1 AND sp.Numero = $2;`, [id , idPar]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
}

}


exports.obtenerCantidadSuelos = async (req, res) => {
    try {
      const [rows] = await db.query('SELECT COUNT(id) AS total_suelos FROM suelo;');
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener la cantidad de suelos:', error);
      res.status(500).json({ error: 'Error del servidor al obtener la cantidad de suelos' });
    }
  };
  

exports.agregarSuelo = async (req, res) => {
  let suelos = req.body;

  // Si el body es un solo objeto, lo convertimos en array
  if (!Array.isArray(suelos)) {
    suelos = [suelos];
  }

  const errores = [];
  const exitos = [];

  for (const [index, suelo] of suelos.entries()) {
    const {
      color,
      carbono,
      fertilidad,
      idsubparcela
    } = suelo;

    // Validación
    if (!color || carbono == null || fertilidad == null || idsubparcela == null) {
      errores.push({ index, error: 'Faltan campos obligatorios del suelo' });
      continue;
    }

    try {
      const result = await db.query(
        `INSERT INTO suelo (color, carbono, fertilidad, idsubparcela) VALUES ($1, $2, $3, $4) RETURNING id`,
        [color, carbono, fertilidad, idsubparcela]
      );

      res.status(201).json({ mensaje: 'Registro agregado exitosamente', idInsertado: result.insertId });
    } catch (err) {
      console.error(`Error al insertar suelo en fila ${index}:`, err);
      errores.push({ index, error: 'Error del servidor al insertar el suelo' });
    }
  }

  if (errores.length > 0) {
    return res.status(207).json({ mensaje: "Algunos suelos no se pudieron insertar", exitos, errores });
  }

  res.status(201).json({ mensaje: 'Todos los suelos fueron insertados exitosamente', exitos });
};

  