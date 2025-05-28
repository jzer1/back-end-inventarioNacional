const express = require('express')
const router = express.Router()
const controladorConglomerado = require('../../constroladores/controConglome')

router.get('/obtener-id-conglomerado',controladorConglomerado.obtenerIdConglomerado)
router.get('/obtener-conglomerado/:id',controladorConglomerado.obtenerConglomerado)

router.get('/obtener-subparcelas-conglomerado/:id',controladorConglomerado.obtenerSubParcelasConglomerado)
//
router.get('/ObtenerConglomeradoPorRegion/:region',controladorConglomerado.obtenerConglomeradoPorRegion)
router.get('/ObtenerConglomeradoPorPostEstrato/:PostEstrato',controladorConglomerado.obtenerConglomeradoPorPostEstrato)
//
router.get('/ObtenerConglomeradoPorPostEstratoYRegion/:PostEstrato/:region', controladorConglomerado.obtenerConglomeradoPorPostEstratoYRegion)
router.get('/ObtenerTodosIdConglomerados',controladorConglomerado.obtenerConglomeradoID)
router.post('/agregar-conglomerado/:latitud/:longitud/:observaciones/:region/:posEstrato',controladorConglomerado.agregarConglomerado)


module.exports = router