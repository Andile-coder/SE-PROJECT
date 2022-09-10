import express, { Application } from 'express';
import cors from 'cors';
import { wrapper } from '../Middlewares/Wrapper';
import BookingRoutes from '../Routes/Booking';

export class ServerConfig {
  public server: Application = express();

  constructor() {
    this._middleware();
    this._routes();
  }

  public getServer(): Application {
    return this.server;
  }

  private _middleware(): void {
    this.server.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
      })
    );
  }

  private _routes(): void {
    this.server.get('/test', (_request, response) => {
      response.status(200).json({ msg: 'Test' });
    });

    this.server.get('/', (_request, response) => {
      response.status(200).json({ msg: '🔥MRANK-CLUB🔥' });
    });

    this.server.use(BookingRoutes);

    //Global Error Handler
    this.server.use(wrapper);
  }
}
