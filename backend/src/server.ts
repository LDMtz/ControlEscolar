import app from './app.js';
import * as dotenv from 'dotenv';

import { getSequelizeInstance } from "./config/database.js";

// Cargargar variables de entorno
dotenv.config(); 

const PORT = process.env.PORT || 3000;

//Obtiene instancia de sequelize
const sequelize = getSequelizeInstance({
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    env: process.env.NODE_ENV!
});

const startServer = async () =>{
    try {
        console.log("\n-> CONECTANDO A LA BD Y LEVANTANDO EL SERVIDOR:")

        // Verificar conexión
        await sequelize.authenticate();
        console.log("Conexión a la BD establecida.");

        //Levantar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}\n`);
        });
    } catch (error) {
        console.error("Error al iniciar la aplicación:", error);
        process.exit(1);
    }
}

startServer();