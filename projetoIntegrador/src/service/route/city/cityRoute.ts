import type { AxiosInstance } from "axios";
import { CityAttributes } from "./city";

export class CityRoute {
  server: AxiosInstance;
  route: string;

  constructor(server: AxiosInstance) {
    this.server = server;
    this.route = "/city";
  }

  async getByState(id: Number): Promise<CityAttributes[]> {
    const data = (await this.server.get(this.route + "/" + id)).data;
    return data.map((item) => new CityAttributes(item));
  }
}
