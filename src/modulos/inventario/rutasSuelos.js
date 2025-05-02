const express = require('express')
const router = express.Router()
const controladorSuelos = require('../../constroladores/controSuelos')

router.get('/obtener-todos-suelo',controladorSuelos.obtenerTodosSuelo)
router.get('/obtener-suelo/:id',controladorSuelos.obtenerSuelo)
router.get('/obtener-subparcela-suelo/:id/:idPar',controladorSuelos.obtenerSubParcelaSuelo)
router.get('/obtener-cantidad-suelo',controladorSuelos.obtenerCantidadSuelos)
router.post('/agregar-suelo',controladorSuelos.agregarSuelo)

module.exports = router;


