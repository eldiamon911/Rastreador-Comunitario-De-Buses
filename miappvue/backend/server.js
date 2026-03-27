const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config();

const conexion = require('./db');
const app = express();

// permite recibir JSON y conectarse desde Vue
app.use(cors());
app.use(express.json());

// ===== REGISTRO =====
// recibe usuario, correo y contrasena y los guarda en la base de datos
app.post('/registro', async (req, res) => {
    const { usuario, correo, contrasena } = req.body;

    if (!usuario || !correo || !contrasena) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    try {
        // encripta la contrasena antes de guardarla
        const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);

        const sql = 'INSERT INTO usuarios (usuario, correo, contrasena) VALUES (?, ?, ?)';
        conexion.query(sql, [usuario, correo, contrasenaEncriptada], (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ mensaje: 'El usuario o correo ya existe' });
                }
                return res.status(500).json({ mensaje: 'Error al registrar usuario' });
            }
            res.json({ mensaje: 'Usuario registrado correctamente' });
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
});

// ===== LOGIN =====
// verifica usuario y contrasena contra la base de datos
app.post('/login', async (req, res) => {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const sql = 'SELECT * FROM usuarios WHERE usuario = ?';
    conexion.query(sql, [usuario], async (err, resultados) => {
        if (err) return res.status(500).json({ mensaje: 'Error en el servidor' });

        if (resultados.length === 0) {
            return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
        }

        const usuarioEncontrado = resultados[0];

        // compara la contrasena con la encriptada en la base de datos
        const contrasenaCorrecta = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);

        if (!contrasenaCorrecta) {
            return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
        }

        res.json({
            mensaje: 'Login exitoso',
            usuario: usuarioEncontrado.usuario,
            correo: usuarioEncontrado.correo
        });
    });
});

// ===== OLVIDASTE LA CONTRASEÑA =====
// busca el correo en la base de datos y envia un email con la contrasena
app.post('/recuperar', async (req, res) => {
    const { correo } = req.body;

    if (!correo) {
        return res.status(400).json({ mensaje: 'El correo es obligatorio' });
    }

    const sql = 'SELECT * FROM usuarios WHERE correo = ?';
    conexion.query(sql, [correo], async (err, resultados) => {
        if (err) return res.status(500).json({ mensaje: 'Error en el servidor' });

        if (resultados.length === 0) {
            return res.status(404).json({ mensaje: 'No existe una cuenta con ese correo' });
        }

        // genera una contrasena temporal de 8 caracteres
        const contrasenaTemporal = Math.random().toString(36).slice(-8);
        const contrasenaEncriptada = await bcrypt.hash(contrasenaTemporal, 10);

        // actualiza la contrasena en la base de datos
        conexion.query(
            'UPDATE usuarios SET contrasena = ? WHERE correo = ?',
            [contrasenaEncriptada, correo],
            async (err) => {
                if (err) return res.status(500).json({ mensaje: 'Error al actualizar contraseña' });

                // envia el correo con la contrasena temporal
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: correo,
                    subject: 'Recuperación de contraseña - Pronto',
                    html: `
                        <h2>Recuperación de contraseña</h2>
                        <p>Tu nueva contraseña temporal es:</p>
                        <h3 style="color: #2563eb;">${contrasenaTemporal}</h3>
                        <p>Por favor cámbiala después de iniciar sesión.</p>
                    `
                };

                transporter.sendMail(mailOptions, (err) => {
                    if (err) return res.status(500).json({ mensaje: 'Error al enviar el correo' });
                    res.json({ mensaje: 'Correo de recuperación enviado correctamente' });
                });
            }
        );
    });
});

// inicia el servidor en el puerto definido en .env
app.listen(process.env.PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${process.env.PORT}`);
});