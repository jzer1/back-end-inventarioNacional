const db = require('../BD/connection');

exports.obtenerTodosArboles = async (req, res) => {
  try {
    const rows = await db.query('SELECT a.Id, a.NombreComun, a.Condicion, a.Azimut, a.Distancia, a.Numero_fustes, a.Diametro, a.Altura_fuste, a.Forma_fuste, a.Altura_total, a.Diametro_fuste, a.Diametro_copa, e.NombreCientifico AS Especie, t.Descripcion AS Tamano FROM Arbol a JOIN  Especie e ON a.IdEspecie = e.Id JOIN Tamano t ON a.IdTamano = t.Id;');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};


//consulta los arboles de un conglomerado 
exports.obtenerArboles = async(req, res)=>{
    const { id } = req.params; 

    if (!id) {
        return res.status(400).json({ error: 'Falta el campo' });
    }
  

    try {
      const rows = await db.query('SELECT a.Id, a.NombreComun, a.Condicion, a.Azimut, a.Distancia, a.Numero_fustes, a.Diametro, a.Altura_fuste, a.Forma_fuste, a.Altura_total, a.Diametro_fuste, a.Diametro_copa, e.NombreCientifico AS Especie, t.Descripcion AS Tamano FROM Arbol a JOIN  Especie e ON a.IdEspecie = e.Id JOIN Tamano t ON a.IdTamano = t.Id JOIN Sub_parcela sp ON a.IdSubParcela = sp.Id JOIN Conglomerado c ON sp.IdConglomerado = c.Id WHERE c.Id = $1;', [id]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }
}

//consulta los arboles de un conglomerado por especie
exports.obtenerEspecieArbol = async(req,res)=>{
    const { id , especie} = req.params; 

    if (!id || !especie) {
        return res.status(400).json({ error: 'Falta el campo posestrato' });
    }
  

    try {
      const rows = await db.query('SELECT a.* FROM conglomerado c JOIN subparcela s ON c.id = s.idConglomerado  JOIN arbol a ON s.id = a.idSubparcela JOIN especie e ON e.id = a.idespecie WHERE c.id = ? and e.nombre_Comun = ? ', [id , especie]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }

}

//consulta los arboles de un conglomerado por parcela
exports.obtenerSubParcelaArbol = async(req,res)=>{
    const { id , Parc } = req.params; 

    if (!id || !Parc) {
        return res.status(400).json({ error: 'Falta el campo ' });
    }
  

    try {
      const rows = await db.query(`
      SELECT a.Id, a.NombreComun, a.Condicion, a.Azimut, a.Distancia, a.Numero_fustes, 
             a.Diametro, a.Altura_fuste, a.Forma_fuste, a.Altura_total, 
             a.Diametro_fuste, a.Diametro_copa, 
             e.NombreCientifico AS Especie, t.Descripcion AS Tamano 
      FROM Arbol a 
      JOIN Especie e ON a.IdEspecie = e.Id 
      JOIN Tamano t ON a.IdTamano = t.Id 
      JOIN Sub_parcela sp ON a.IdSubParcela = sp.Id 
      JOIN Conglomerado c ON sp.IdConglomerado = c.Id 
      WHERE c.Id = $1 AND sp.Numero = $2;
    `, [id, Parc]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }
}

//consulta los arboles de un conglomerado  por tamaño
exports.obtenerTamanoArbol = async(req,res)=>{
    const { id , tamano } = req.params; 

    if (!id) {
        return res.status(400).json({ error: 'Falta el campo posestrato' });
    }
  

    try {
      const rows = await db.query('SELECT a.* FROM conglomerado c JOIN subparcela s ON c.id = s.idConglomerado  JOIN arbol a ON s.id = a.idSubparcela WHERE c.id = ? and a.tamano=', [id, tamano]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }
}

//consulta los arboles de un conglomerado por condicion
exports.obtenerCondicionArbol =async(req,res)=>{
    const { id , condicion } = req.params; 

    if (!id) {
        return res.status(400).json({ error: 'Falta el campo posestrato' });
    }
  

    try {
      const rows = await db.query('SELECT a.* FROM conglomerado c JOIN subparcela s ON c.id = s.idConglomerado  JOIN arbol a ON s.id = a.idSubparcela WHERE c.id = ? and a.condicion =?', [id, condicion]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }
}

//consulta los arboles de un conglomerado por la forma de fuste
exports.obteneFormaArbol = async(req,res)=>{
    const { id , forma } = req.params; 

    if (!id) {
        return res.status(400).json({ error: 'Falta el campo posestrato' });
    }
  

    try {
      const rows = await db.query('SELECT a.* FROM conglomerado c JOIN subparcela s ON c.id = s.idConglomerado  JOIN arbol a ON s.id = a.idSubparcela WHERE c.id = ? and a.forma_fuste =?', [id, forma]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }

}

//consulta la cantidad de arboles de un conglomerado 
exports.obtenerCantidadArboles = async(req,res)=>{
    try {
      const rows = await db.query('SELECT COUNT(id) AS total_arboles FROM arbol;');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }

}

//agrega un arbol
exports.agregarArbol = async (req, res) => {
  const arboles = req.body;

  if (!Array.isArray(arboles) || arboles.length === 0) {
    return res.status(400).json({ error: "Se esperaba un arreglo de árboles." });
  }

  const errores = [];
  const resultados = [];

  for (const [i, arbol] of arboles.entries()) {
    const {
      nombrecomun,
      condicion,
      azimut,
      distancia,
      numero_fustes,
      diametro,
      altura_fuste,
      forma_fuste,
      altura_total,
      diametro_fuste,
      diametro_copa,
      especie,
      idsubparcela,
      tamano
    } = arbol;

    // Validar campos
    if (
      !nombrecomun || !condicion || azimut == null || distancia == null || numero_fustes == null ||
      diametro == null || altura_fuste == null || !forma_fuste || altura_total == null ||
      diametro_fuste == null || diametro_copa == null || !especie || !idsubparcela || !tamano
    ) {
      errores.push({ index: i, error: "Faltan campos obligatorios" });
      continue;
    }

    try {
      const result = await db.query(
        `INSERT INTO public.arbol (
          nombrecomun, condicion, azimut, distancia, numero_fustes, diametro,
          altura_fuste, forma_fuste, altura_total, diametro_fuste, diametro_copa,
          idespecie, idsubparcela, idtamano
        )
        VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10, $11,
          (SELECT id FROM especie WHERE nombrecientifico = $12),
          $13,
          (SELECT id FROM tamano WHERE descripcion = $14)
        )
        RETURNING id;`,
        [
          nombrecomun,
          condicion,
          azimut,
          distancia,
          numero_fustes,
          diametro,
          altura_fuste,
          forma_fuste,
          altura_total,
          diametro_fuste,
          diametro_copa,
          especie,
          idsubparcela,
          tamano
        ]
      );

      res.status(201).json({ mensaje: 'Registro agregado exitosamente', idInsertado: result.insertId });
    } catch (error) {
      errores.push({ index: i, error: error.message });
    }
  }

  if (errores.length > 0) {
    return res.status(207).json({ mensaje: "Algunos registros no se insertaron", resultados, errores });
  }

  return res.status(201).json({ mensaje: "Todos los árboles insertados correctamente", resultados });
};
