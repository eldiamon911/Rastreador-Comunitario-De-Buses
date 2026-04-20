## Instalación

1. Instalar dependencias:
   npm install

2. Crear un archivo .env con este contenido:
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_contraseña_de_mysql
   DB_NAME=pronto_db
   PORT=3000

3. Crear la base de datos en MySQL Workbench ejecutando el script SQL del archivo database.sql

4. Correr el servidor:
   node index.js