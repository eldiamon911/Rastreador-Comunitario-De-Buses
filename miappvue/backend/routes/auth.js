const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const conexion = require('../db')

router.post('/registro', (req, res) => {
    const { usuario, contrasena } = req.body
    if (!usuario || !contrasena) {
        return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' })
    }
    const hash = bcrypt.hashSync(contrasena, 10)
    const sql = 'INSERT INTO usuarios (usuario, contrasena) VALUES (?, ?)'
    conexion.query(sql, [usuario, hash], (error) => {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'El usuario ya existe' })
            }
            return res.status(500).json({ error: 'Error al registrar usuario' })
        }
        res.json({ mensaje: 'Usuario registrado correctamente' })
    })
})

router.post('/login', (req, res) => {
    const { usuario, contrasena } = req.body
    const sql = 'SELECT * FROM usuarios WHERE usuario = ?'
    conexion.query(sql, [usuario], (error, resultados) => {
        if (error) return res.status(500).json({ error: 'Error en el servidor' })
        if (resultados.length === 0) {
            return res.status(400).json({ error: 'Usuario no encontrado' })
        }
        const usuarioDb = resultados[0]
        const contrasenaValida = bcrypt.compareSync(contrasena, usuarioDb.contrasena)
        if (!contrasenaValida) {
            return res.status(400).json({ error: 'Contraseña incorrecta' })
        }
        res.json({ mensaje: 'Login exitoso', usuario: usuarioDb.usuario })
    })
})

module.exports = router