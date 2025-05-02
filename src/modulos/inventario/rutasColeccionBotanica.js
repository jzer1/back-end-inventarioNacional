const express = require('express')
const router = express.Router()
const controladorColeccionBotanico = require('../../constroladores/controColeccionBotanica')

router.get('/obtener-todos-ColeccionBotanico',controladorColeccionBotanico.obtenerTodosColeccionBotanico)
router.get('/obtener-ColeccionBotanico/:id', controladorColeccionBotanico.obtenerColeccionBotanico)
router.get('/obtener-subParcela-ColeccionBotanico/:id/:idSub',controladorColeccionBotanico.obtenerSubParcelasColeccionBotanico)
router.get('/obtener-cantidad-ColeccionBotanico',controladorColeccionBotanico.obtenerCantidadColeccionBotanico)
router.post('/agregar-ColeccionBotanico',controladorColeccionBotanico.agregarColeccionBotanico)

module.exports =router;