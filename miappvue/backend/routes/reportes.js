const express = require('express')
const router = express.Router()
const conexion = require('../db')
const verificarToken = require('../middleware/verificarToken')

router.get('/', verificarToken, (req, res) => {
    conexion.query('SELECT * FROM reportes ORDER BY creado_en DESC', (error, resultados) => {
        if (error) return res.status(500).json({ error: 'Error al obtener reportes' })
        res.json(resultados)
    })
})

router.post('/', verificarToken, (req, res) => {
    const { usuario, mensaje } = req.body
    if (!usuario || !mensaje) return res.status(400).json({ error: 'Datos incompletos' })
    conexion.query('INSERT INTO reportes (usuario, mensaje) VALUES (?, ?)', [usuario, mensaje], (error) => {
        if (error) return res.status(500).json({ error: 'Error al guardar reporte' })
        res.json({ mensaje: 'Reporte guardado' })
    })
})

module.exports = router