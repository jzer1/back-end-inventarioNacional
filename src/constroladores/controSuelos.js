const db = require('../BD/connection')


exports.obtenerSuelo = async (req,res)=>{
        const { id } = req.params; 
    
        if (!id) {
            return res.status(400).json({ error: 'Falta el campo ' });
        }
      
    
        try {
          const rows = await db.query('SELECT su.* FROM conglomerado c JOIN subparcela s ON c.id = s.idConglomerado  JOIN suelo su ON s.id = su.idSubParcela WHERE c.id = ? ', [id]);
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
      const rows = await db.query('SELECT su.* FROM conglomerado c JOIN subparcela s ON c.id = s.idConglomerado  JOIN suelo su ON s.id = su.idSubParcela WHERE c.id = ? and s.id=? ', [id , idPar]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
}

}


exports.obtenerCantidadSuelos = async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ error: 'Falta el campo id del conglomerado' });
    }
  
    try {
      const [rows] = await db.query(
        'SELECT COUNT(su.id) AS total_suelos FROM conglomerado c JOIN subparcela s ON c.id = s.idConglomerado JOIN suelo su ON s.id = su.idSubParcela WHERE c.id = ?',
        [id]
      );
  
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error al obtener la cantidad de suelos:', error);
      res.status(500).json({ error: 'Error del servidor al obtener la cantidad de suelos' });
    }
  };
  

exports.agregarSuelo = async (req, res) => {
    const { carbono, color, fertilidad, observaciones, idSubParcela } = req.body;
  
    // ✔ Validación clara y completa
    if (!carbono || !color || !fertilidad || !observaciones || !idSubParcela) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' }); // mensaje corregido
    }
  
    try {
      const result = await db.query(
        'INSERT INTO suelo (carbono, color, fertilidad, observaciones, idSubParcela) VALUES (?, ?, ?, ?, ?)',
        [carbono, color, fertilidad, observaciones, idSubParcela]
      );
      res.status(201).json({
        mensaje: 'Suelo agregado exitosamente', // mensaje corregido para que sea coherente
        idInsertado: result.insertId
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  };
  