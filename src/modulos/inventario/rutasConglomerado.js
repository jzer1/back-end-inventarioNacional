const express = require('express')
const router = express.Router()
const controladorConglomerado = require('../../constroladores/controConglome')

router.get('/obtener-id-conglomerado',controladorConglomerado.obtenerIdConglomerado)
router.get('/obtener-conglomerado/:id',controladorConglomerado.obtenerConglomerado)

router.get('/obtener-subparcelas-conglomerado/:id',controladorConglomerado.obtenerSubParcelasConglomerado)
router.post('/agregar-conglomerado/:latitud/:longitud/:observaciones/:region/:posEstrato',controladorConglomerado.agregarConglomerado)
//
router.get('/ObtenerConglomeradoPorRegion/:region',controladorConglomerado.obtenerConglomeradoPorRegion)
router.get('/ObtenerConglomeradoPorPostEstrato/:PostEstrato',controladorConglomerado.obtenerConglomeradoPorPostEstrato)
module.exports = router