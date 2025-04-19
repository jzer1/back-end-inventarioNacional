const express = require('express')
const router = express.Router()
const controladorArboles = require('../../constroladores/controArboles')

router.get('/obtener-arboles/:id', controladorArboles.obtenerArboles)
router.get('/obtener-especie-arboles/:id/:especie', controladorArboles.obtenerEspecieArbol)
router.get('/obtener-subParcela-arboles/:id/:idSub', controladorArboles.obtenerSubParcelaArbol)
router.get('/obtener-tamano-arboles/:id/:tamano', controladorArboles.obtenerTamanoArbol)
router.get('/obtener-condicion-arboles/:id/:condicion', controladorArboles.obtenerCondicionArbol)
router.get('/obtener-forma-arboles/:id/:forma', controladorArboles.obteneFormaArbol)
router.get('/obtener-cantidad-arboles/:id', controladorArboles.obtenerCantidadArboles)
router.post('/agregar-arbol', controladorArboles.agregarArbol);

module.exports = router