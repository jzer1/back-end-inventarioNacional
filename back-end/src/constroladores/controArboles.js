const db = require('../BD/connection');

//consulta los arboles de un conglomerado 
exports.obtenerArboles = async(req, res)=>{
    const { id } = req.params; 

    if (!id) {
        return res.status(400).json({ error: 'Falta el campo posestrato' });
    }
  

    try {
      const rows = await db.query('SELECT a.* FROM conglomerado c JOIN subparcela s ON c.id = s.idConglomerado  JOIN arbol a ON s.id = a.idSubparcela WHERE c.id = ?', [id]);
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
    const { id , idParc } = req.params; 

    if (!id) {
        return res.status(400).json({ error: 'Falta el campo posestrato' });
    }
  

    try {
      const rows = await db.query('SELECT a.* FROM conglomerado c JOIN subparcela s ON c.id = s.idConglomerado  JOIN arbol a ON s.id = a.idSubparcela WHERE c.id = ? and s.id=?', [id, idParc]);
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
    const { id } = req.params; 

    if (!id) {
        return res.status(400).json({ error: 'Falta el campo posestrato' });
    }
  

    try {
      const rows = await db.query('SELECT COUNT(a.id) AS total_arboles FROM conglomerado c JOIN subparcela s ON c.id = s.idConglomerado JOIN arbol a ON s.id = a.idSubparcela WHERE c.id = ?;', [id]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }

}

//agrega un arbol
exports.agregarArbol = async (req, res) => {
    const {
      tamano, condicion, azimut, distancia, numero_fustes,
      diametro, altura_fuste, forma_fuste, altura_total,
      diametro_fuste, diametro_copa, observaciones,
      idEspecie, idSubParcela
    } = req.body;
  
    // Validación básica
    if (
      !tamano || !condicion || !azimut || !distancia || !numero_fustes ||
      !diametro || !altura_fuste || !forma_fuste || !altura_total ||
      !diametro_fuste || !diametro_copa || !idEspecie || !idSubParcela
    ) {
      return res.status(400).json({ error: 'Faltan campos obligatorios del árbol' });
    }
  
    try {
      const result = await db.query(
        'INSERT INTO arbol (tamano, condicion, azimut, distancia, numero_fustes, diametro, altura_fuste, forma_fuste, altura_total, diametro_fuste, diametro_copa, observaciones, idEspecie, idSubParcela) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          tamano, condicion, azimut, distancia, numero_fustes,
          diametro, altura_fuste, forma_fuste, altura_total,
          diametro_fuste, diametro_copa, observaciones,
          idEspecie, idSubParcela
        ]
      );
      res.status(201).json({ mensaje: 'Árbol agregado exitosamente', idInsertado: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  };
  