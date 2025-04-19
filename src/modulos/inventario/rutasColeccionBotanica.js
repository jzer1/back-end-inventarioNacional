const express = require('express')
const router = express.Router()
const controladorColeccionBotanico = require('../../constroladores/controColeccionBotanica')

router.get('/obtener-ColeccionBotanico', controladorColeccionBotanico.obtenerCantidadColeccionBotanico)
router.get('/obtener-subParcela-ColeccionBotanico',controladorColeccionBotanico.obtenerSubParcelasColeccionBotanico)
router.get('/obtener-cantidad-ColeccionBotanico',controladorColeccionBotanico.obtenerCantidadColeccionBotanico)
router.post('agregar-ColeccionBotanico',controladorColeccionBotanico.agregarColeccionBotanico)

module.exports =router;