const db = require('../BD/connection');


//obtiene todos los id de los conglomerados 
exports.obtenerIdConglomerado = async (req, res) => {
  try {
    const rows = await db.query('SELECT * FROM conglomerado');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};


//obtiene todo el contenido del conglomerado por el id
exports.obtenerConglomerado = async (req, res) => {
    const { id } = req.params; 

    if (!id) {
        return res.status(400).json({ error: 'Falta el campo posestrato' });
    }
  

    try {
      const rows = await db.query('SELECT * FROM conglomerado WHERE id = ?', [id]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }
}

///
exports.obtenerConglomeradoPorRegion = async(req,res)=>{
  const {region} = req.params; 

  if (!region) {
      return res.status(400).json({ error: 'Falta el campo region' });
  }


  try {
    const rows = await db.query('select * from conglomerado where region = ?', [region]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }

}
//

//obtiene todos los conglomerados de una region
exports.obtenerRegionConglomerado = async (req, res) => {
  const { region } = req.params;

  if (!region) {
    return res.status(400).json({ error: true, mensaje: 'Falta el campo región' });
  }

  const regionSanitizada = region.trim();  // Elimina espacios y saltos de línea
  console.log("Región sanitizada:", regionSanitizada);

  try {
    // Ejecutamos la consulta con la región sanitizada
    const [rows] = await db.query(
      'SELECT * FROM conglomerado WHERE UPPER(region) LIKE UPPER(?)',
      [`%${regionSanitizada}%`]
    );
    

    console.log("Cantidad de conglomerados encontrados:", rows.length);
    console.log("Resultado de la consulta:", rows);

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        error: true,
        mensaje: 'No se encontraron datos para la región solicitada',
        detalle: `Consulta para la región '${regionSanitizada}' no devolvió resultados.`
      });
    }

    res.status(200).json({
      error: false,
      cantidad: rows.length,
      datos: rows
    });
  } catch (error) {
    console.error("Error al consultar la base de datos:", error.message);
    return res.status(500).json({ error: true, mensaje: 'Error del servidor', detalle: error.message });
  }
};


//obtiene todos los conglomerados por su posEstrato 
exports.obtenerPosEstratoConglomerado = async (req, res) => {
    const { pos } = req.params;
  
    if (!pos) {
      return res.status(400).json({ error: 'Falta el campo posestrato' });
    }
  
    try {
      const rows = await db.query('SELECT * FROM CONGLOMERADO WHERE POSESTRATO = ?', [pos]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }
}

//obtiene todas las subParcelas de un conglomerado 
exports.obtenerSubParcelasConglomerado = async (req,res)=>{
    const { id } = req.params; // o req.params si lo pasas por URL

    if (!id) {
        return res.status(400).json({ error: 'Falta el campo posestrato' });
      }
  
      
    try {
      const rows = await db.query('SELECT s.* FROM conglomerado c JOIN subparcela s ON c.id = s.idConglomerado WHERE c.id = ?', [id]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }
}

//agrega un nuevo conglomerado
exports.agregarConglomerado = async (req, res) => {
    const { latitud, longitud, observaciones, region, posEstrato } = req.params;
  
    if (!latitud || !longitud || !observaciones || !region || !posEstrato) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
  
    try {
      const result = await db.query(
        'INSERT INTO conglomerado (latitud, longitud, observaciones, region, posEstrato) VALUES (?, ?, ?, ?, ?)',
        [latitud, longitud, observaciones, region, posEstrato]
      );
      res.status(201).json({ mensaje: 'Conglomerado agregado exitosamente', idInsertado: result.insertId });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Error del servidor' });
    }
}