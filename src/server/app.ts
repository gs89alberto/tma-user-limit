import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { ServerInterface } from './app.interface';
import baseRouter from '../modules/baseRouter';

class Server implements ServerInterface {
  async server(): Promise<express.Application> {
    const app = express();
    app
      .use(express.urlencoded({ extended: true }))
      .use(morgan('combined'))
      .use(cors())
      .use(express.json());

    app.use('/api/v1', baseRouter.routes);
    app.get('/', (req, res) => {
      res.send("It's working! ");
    });
    return app;
  }
}
process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

export default new Server();
