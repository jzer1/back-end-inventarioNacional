const express = require('express')
const router = express.Router()
const contoladorCoinvestigador = require ('../../constroladores/controCoinvestigador')

// rutaCoinvestigador.js
router.post('/agregar', contoladorCoinvestigador.agregarCoinvestigador);


module.exports = router