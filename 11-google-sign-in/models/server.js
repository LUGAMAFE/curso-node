import cors from 'cors';
import express from 'express';
import * as url from 'url';
import authRoutes from '../routes/auth.js';
import usuariosRoutes from '../routes/usuarios.js';
const __dirname = url.fileURLToPath(new URL('../', import.meta.url));

import { dbConnection } from '../database/config.js';

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';
    this.authPath = '/api/auth';

    //Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.usuariosPath, usuariosRoutes);
    this.app.all('*', function (req, res) {
      res.sendFile(__dirname + './public/index.html');
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}
