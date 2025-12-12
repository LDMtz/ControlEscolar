import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import db from "./config/database.js";

dotenv.config(); 

const PORT = process.env.PORT || 3000;

const app = express();

//Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev')); 

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}\n`));

//Conexion a la BD
try {
    await db.authenticate().then(() => console.log("Conexión a la BD establecida."));
} catch (error) {
    console.error("Error al conectar a la BD:", error), process.exit(1);
}