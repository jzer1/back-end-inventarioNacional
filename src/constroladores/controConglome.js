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
    const rows = await db.query('select * from conglomerado where postestrato = $1', [PostEstrato]);
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
    const rows = await db.query('SELECT c.latitud, c.longitud, c.id, c.postestrato, r.nombre FROM conglomerado c JOIN region r ON c.idregion = r.id WHERE c.postestrato = $1 AND  r.nombre = $2;', [PostEstrato, region]);
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
  let conglomerado = req.body;

  // Si recibes un solo objeto, conviértelo en array
  if (!Array.isArray(conglomerado)) {
    conglomerado = [conglomerado];
  }

  const errores = [];
  const exitos = [];

  for (const [index, cong] of conglomerado.entries()) {
    const {
      latitud, longitud, postestrato, fechainicial, fechafinal, idcoinvestigador, region
    } = cong;

    // Validación
    if (!postestrato || latitud == null || longitud == null || idcoinvestigador == null || !fechainicial || !fechafinal || !region) {
      errores.push({ index, error: 'Faltan campos obligatorios del conglomerado' });
      continue;
    }

    try {
      const result = await db.query(
        `INSERT INTO conglomerado (latitud, longitud, postestrato, fechainicial, fechafinal, idregion, idcoinvestigador) 
         VALUES ($1, $2, $3, $4, $5, (SELECT id FROM region WHERE nombre = $6), 
           $7) 
         RETURNING id`, 
        [latitud, longitud, postestrato, fechainicial, fechafinal,region , idcoinvestigador]
      );
      

      if (result && result.length > 0 && result[0].id != null) {
        const newConglomeradoId = result[0].id; 
        exitos.push({ index, id: newConglomeradoId, mensaje: 'Conglomerado insertado exitosamente' });
      }

    } catch (err) {
      console.error(`Error en fila ${index}:`, err);
      errores.push({ index, error: 'Error del servidor al insertar conglomerado', detalle: err.message });
    }
  }

  if (errores.length > 0) {
    return res.status(207).json({
      mensaje: "Algunos conglomerados no se pudieron insertar",
      exitos,
      errores
    });
  }

  return res.status(201).json({
    mensaje: 'Todos los conglomerados fueron insertados exitosamente',
    exitos
  });
};


//agrega una nueva subparcela
exports.agregarSubparcela = async (req, res) => {
  let subparcelas = req.body;

  if (!Array.isArray(subparcelas)) {
    subparcelas = [subparcelas];
  }

  const errores = [];
  const exitos = [];

  for (const [index, item] of subparcelas.entries()) {
    const { latitud, longitud, numero, idconglomerado } = item;

    if (
      latitud == null || 
      longitud == null || 
      numero == null || 
      idconglomerado == null
    ) {
      errores.push({ index, error: 'Faltan o son inválidos algunos campos de la subparcela' });
      continue;
    }

    try {
      const result = await db.query(
        `INSERT INTO sub_parcela (latitud, longitud, numero, idconglomerado)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [latitud, longitud, numero, idconglomerado]
      );

      exitos.push({ index, idInsertado: result.id });
    } catch (err) {
      console.error(`Error en fila ${index}:`, err);
      errores.push({ index, error: err.message || 'Error del servidor al insertar subparcela' });
    }
  }

  if (errores.length > 0) {
    return res.status(207).json({
      mensaje: "Algunas subparcelas no se pudieron insertar",
      exitos,
      errores
    });
  }

  return res.status(201).json({
    mensaje: 'Todas las subparcelas fueron insertadas exitosamente',
    exitos
  });
};
