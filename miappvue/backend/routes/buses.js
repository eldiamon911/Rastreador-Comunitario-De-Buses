const express = require('express')
const router = express.Router()
const conexion = require('../db')
const verificarToken = require('../middleware/verificarToken')

router.get('/', verificarToken, (req, res) => {
    const sql = `
        SELECT b.*, r.codigo, r.nombre as nombre_ruta 
        FROM buses b 
        LEFT JOIN rutas r ON b.id_ruta = r.id
    `
    conexion.query(sql, (error, resultados) => {
        if (error) return res.status(500).json({ error: 'Error al obtener buses' })
        res.json(resultados)
    })
})

module.exports = router