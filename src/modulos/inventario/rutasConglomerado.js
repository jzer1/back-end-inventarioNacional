const express = require('express')
const router = express.Router()
const controladorConglomerado = require('../../constroladores/controConglome')

router.get('/obtener-id-conglomerado',controladorConglomerado.obtenerIdConglomerado)
router.get('/obtener-conglomerado/:id',controladorConglomerado.obtenerConglomerado)
router.get('/obtener-conglomerado-region/:region',controladorConglomerado.obtenerRegionConglomerado)
router.get('/obtener-conglomerado-posEstrato/:pos',controladorConglomerado.obtenerPosEstratoConglomerado)
router.get('/obtener-subparcelas-conglomerado/:id',controladorConglomerado.obtenerSubParcelasConglomerado)
router.post('/agregar-conglomerado/:latitud/:longitud/:observaciones/:region/:posEstrato',controladorConglomerado.agregarConglomerado)
//
router.get('/ObtenerConglomeradoPorRegion/:region',controladorConglomerado.obtenerConglomeradoPorRegion)

module.exports = router