const db = require('../BD/connection')

exports.obtenerTodosColeccionBotanico = async (req, res) => {
  try {
    const rows = await db.query('SELECT cb.Id, cb.NombreComun, cb.Foto, ec.NombreCientifico AS EspecieColeccion, t.Descripcion AS Tamaño FROM ColeccionBotanica cb JOIN EspecieColeccionBotanica ec ON cb.IdEspecieColeccion = ec.Id JOIN Tamano t ON cb.IdTamano = t.Id;');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

exports.obtenerColeccionBotanico = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Falta el campo ' });
    }
  
  
    try {
      const rows = await db.query('SELECT cb.Id, cb.NombreComun, cb.Foto, ec.NombreCientifico AS EspecieColeccion, t.Descripcion AS Tamano FROM ColeccionBotanica cb JOIN EspecieColeccionBotanica ec ON cb.IdEspecieColeccion = ec.Id JOIN Tamano t ON cb.IdTamano = t.Id JOIN Arbol a ON cb.IdArbol = a.Id JOIN Sub_parcela sp ON a.IdSubParcela = sp.Id JOIN Conglomerado c ON sp.IdConglomerado = c.Id WHERE c.Id = $1;',[id]);
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener la colección botánica:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  };
  

  exports.obtenerSubParcelasColeccionBotanico = async (req, res) => {
    const { id, idSubParcela } = req.params;

    if (!id ||! idSubParcela) {
        return res.status(400).json({ error: 'Falta el campo ' });
    }
  
  
    try {
      const rows = await db.query('SELECT cb.Id, cb.NombreComun, cb.Foto, ec.NombreCientifico AS EspecieColeccion, t.Descripcion AS Tamano FROM ColeccionBotanica cb JOIN EspecieColeccionBotanica ec ON cb.IdEspecieColeccion = ec.Id JOIN Tamano t ON cb.IdTamano = t.Id JOIN Arbol a ON cb.IdArbol = a.Id JOIN Sub_parcela sp ON a.IdSubParcela = sp.Id JOIN Conglomerado c ON sp.IdConglomerado = c.Id WHERE c.Id = $1 and sp.Numero = $2;',[id, idSubParcela]);
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener por subparcela:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  };
  

  exports.obtenerCantidadColeccionBotanico = async (req, res) => {
    try {
      const [rows] = await db.query('SELECT COUNT(id) AS total_coleccion FROM coleccionbotanica;');
      res.json(rows);
    } catch (error) {
      console.error('Error al contar la colección botánica:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  };
  

exports.agregarColeccionBotanico = async (req, res) => {
  let colecciones = req.body;

  // Si recibes un solo objeto, conviértelo en array
  if (!Array.isArray(colecciones)) {
    colecciones = [colecciones];
  }

  const errores = [];
  const exitos = [];

  for (const [index, coleccion] of colecciones.entries()) {
    const {
      nombrecomun,
      foto,
      idarbol,
      especiecoleccion,
      tamano
    } = coleccion;

    // Validación
    if (!nombrecomun || idarbol == null || !especiecoleccion || !tamano) {
      errores.push({ index, error: 'Faltan campos obligatorios de la colección botánica' });
      continue;
    }

    try {
      const result = await db.query(
        `INSERT INTO public.coleccionbotanica 
        (nombrecomun, foto, idarbol, idespeciecoleccion, idtamano) 
        VALUES ($1, $2, $3, 
          (SELECT id FROM especiecoleccionbotanica WHERE nombrecientifico = $4), 
          (SELECT id FROM tamano WHERE descripcion = $5)
        )
        RETURNING id`,
        [nombrecomun, foto, idarbol, especiecoleccion, tamano]
      );

      res.status(201).json({ mensaje: 'Registro agregado exitosamente', idInsertado: result.insertId });
    } catch (err) {
      console.error(`Error en fila ${index}:`, err);
      errores.push({ index, error: 'Error del servidor al insertar la colección botánica' });
    }
  }

  if (errores.length > 0) {
    return res.status(207).json({ mensaje: "Algunas colecciones no se pudieron insertar", exitos, errores });
  }

  res.status(201).json({ mensaje: 'Todas las colecciones fueron insertadas exitosamente', exitos });
};
