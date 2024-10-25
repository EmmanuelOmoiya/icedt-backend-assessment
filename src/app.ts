import express, { Express } from 'express';
import cors from 'cors';
import routes from './routes'

const app: Express = express();

app.use(
    cors({
      origin: "*",
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
      ],
      methods: ["GET", "PATCH", "POST", "DELETE", "OPTIONS"],
      exposedHeaders: ["Authorization"],
      credentials: true,
    })
  )
  app.options('*', cors());
  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));
  app.use('/', routes);
  export default app;