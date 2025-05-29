const db = require('../BD/connection');


//obtiene todos los conglomerados 
exports.obtenerIdConglomerado = async (req, res) => {
  try {
    const rows = await db.query('SELECT c.id , c.latitud, c.longitud, c.postestrato, r.nombre FROM conglomerado c JOIN region r ON c.idregion = r.id');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

exports.obtenerConglomeradoID = async (req, res) => {
  try {
    const rows = await db.query('SELECT id FROM conglomerado');
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
      const rows = await db.query('SELECT * FROM conglomerado WHERE id = ?',[id]);
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
    const rows = await db.query('SELECT c.latitud, c.longitud, c.id, c.postestrato, r.nombre FROM conglomerado c JOIN region r ON c.idregion = r.id WHERE r.nombre = $1;', [region]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }

}
//


exports.obtenerConglomeradoPorPostEstrato = async(req,res)=>{
  const {PostEstrato} = req.params; 

  if (!PostEstrato) {
      return res.status(400).json({ error: 'Falta el campo PostEstrato' });
  }


  try {
    const rows = await db.query('select * from conglomerado where posEstrato = ?', [PostEstrato]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }

}

//
exports.obtenerConglomeradoPorPostEstratoYRegion = async(req,res)=>{
  const {region, PostEstrato} = req.params; 

  if (!PostEstrato|| !region) {
      return res.status(400).json({ error: 'Falta el campo PostEstrato y region' });
  }


  try {
    const rows = await db.query('select * from conglomerado where posEstrato = ? and region = ?', [PostEstrato, region]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }

}


//
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