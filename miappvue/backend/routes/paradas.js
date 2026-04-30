const express = require('express')
const router = express.Router()
const conexion = require('../db')
const verificarToken = require('../middleware/verificarToken')

router.get('/', verificarToken, (req, res) => {
    const sql = 'SELECT * FROM paradas'
    conexion.query(sql, (error, resultados) => {
        if (error) return res.status(500).json({ error: 'Error al obtener paradas' })
        res.json(resultados)
    })
})

module.exports = router