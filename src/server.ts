import { config } from 'dotenv';
import { ServerConfig } from './Config/server.config';
import { Application } from 'express';
config();

export class API {
  private PORT: string | number = process.env.PORT ?? 4231;
  private serverConfig: ServerConfig;
  private server: Application;

  constructor() {
    this.serverConfig = new ServerConfig();
    this.server = this.serverConfig.getServer();
    this.init();
  }

  private init(): void {
    this.server.listen(this.PORT, () => {
      return console.log(`Server started in PORT ${this.PORT} 🚀`);
    });
  }
}

new API();
