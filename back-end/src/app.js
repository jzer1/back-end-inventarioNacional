const express = require('express')
const config = require('./config')
const cors = require('cors');
const morgan = require('morgan');

const app = express()
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());


//prueba
const inventario= require('./modulos/inventario/rutas')
const testRoutes = require('./modulos/inventario/rutaTest');

//archivo conglomerado
const conglomerado = require('./modulos/inventario/rutasConglomerado')

//archivo arbol
const arbol = require('./modulos/inventario/rutasArboles')

//archivo suelo
const suelo =require('./modulos/inventario/rutasSuelos')

//archivo especie
const especie = require('./modulos/inventario/rutasEspecies')

//archivo ColeccionBotanica
const ColeccionBotanica = require('./modulos/inventario/rutasColeccionBotanica')

//puerto
app.set('port', config.app.port)

//rutas de prueba
app.use('/api/inventario', inventario)
app.use('/api', testRoutes);

//rutas de conglomerado
app.use('/api/conglomerado', conglomerado)

//rutas de arboles
app.use('/api/arbol',arbol)

//rutas de suelo
app.use('/api/suelo',suelo)

//rutas de especie
app.use('/api/especie',especie)

//rutas de ColeccionBotanica
app.use('/api/ColeccionBotanica',ColeccionBotanica)


module.exports = app