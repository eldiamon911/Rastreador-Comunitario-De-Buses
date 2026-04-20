const express = require('express')
const router = express.Router()
const conexion = require('../db')

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM rutas'
    conexion.query(sql, (error, resultados) => {
        if (error) return res.status(500).json({ error: 'Error al obtener rutas' })
        res.json(resultados)
    })
})

router.get('/:id/paradas', (req, res) => {
    const sql = 'SELECT * FROM paradas WHERE id_ruta = ?'
    conexion.query(sql, [req.params.id], (error, resultados) => {
        if (error) return res.status(500).json({ error: 'Error al obtener paradas' })
        res.json(resultados)
    })
})

router.get('/:id/puntos', (req, res) => {
    const sql = 'SELECT latitud, longitud, orden FROM ruta_puntos WHERE id_ruta = ? ORDER BY orden'
    conexion.query(sql, [req.params.id], (error, resultados) => {
        if (error) return res.status(500).json({ error: 'Error al obtener puntos' })
        res.json(resultados)
    })
})

module.exports = router