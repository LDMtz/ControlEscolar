import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import type { Application } from 'express';

import db from "./config/database.js";

dotenv.config(); 

//Clase Server, que inicializa y configura el servidor
class Server {
    //Campos de clase
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000'; 

        // 1. Conexión a Base de Datos
        this.dbConnection();

        // 2. Middlewares
        this.middlewares();

        //TODO: 3. Definición de Rutas (Endpoints)

        //TODO: 4. Middlewares de Manejo de Errores
    }

    // Conexión a la BD
    private async dbConnection() {
        try {
            await db.authenticate().then(() => console.log("Conexión a la BD establecida."));
        } catch (error) {
            console.error("Error al conectar a la BD:", error), process.exit(1);
        }
    }

    //Aplica los middlewares
    private middlewares() {
        // Cors: Habilita el acceso desde el front-end
        this.app.use(cors());

        // Helmet: Cabeceras de seguridad HTTP
        this.app.use(helmet());

        // Lectura del body: Parseo de JSON
        this.app.use(express.json());

        // Morgan: Logs de peticiones en consola
        this.app.use(morgan('dev'));
    }

    public listen() {
        this.app.listen(this.port, () => console.log(`Servidor corriendo en http://localhost:${this.port}/api/\n`));
    }
}

export default Server;