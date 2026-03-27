require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'pronto',
    password: '',
    database: 'pronto_db'
});

conexion.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos: ', err);
        return;
    }
    console.log('✅ Conectado a MySQL correctamente');
});

module.exports = conexion;