const express = require('express')
const router = express.Router()
const controladorEspecies = require('../../constroladores/controEspecie')


router.get('/obtener-especies',controladorEspecies.obtenerEspecies)

module.exports = router