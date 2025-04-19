const db = require('../BD/connection')


exports.obtenerEspecies = async (req,res)=>{

     try {
       const rows = await db.query('select nombre_comun from especi');
       res.json(rows);
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Error del servidor' });
     }
}