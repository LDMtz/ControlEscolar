import * as dotenv from 'dotenv';
import express from 'express';

import db from "./config/database.js";

dotenv.config(); 

const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}\n`));

//Conexion a la BD
try {
    await db.authenticate().then(() => console.log("Conexión a la BD establecida."));
} catch (error) {
    console.error("Error al conectar a la BD:", error), process.exit(1);
}