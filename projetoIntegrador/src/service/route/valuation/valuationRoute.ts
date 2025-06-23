import type { AxiosInstance } from "axios";
import { ValuationAttributes, type ValuationDTOAttributes } from "./valuation";

export class ValuationRoute {
  server: AxiosInstance;
  route: string;

  constructor(server: AxiosInstance) {
    this.server = server;
    this.route = "/valuation";
  }

  async getByIdPropertie(id: Number): Promise<ValuationAttributes[]> {
    const data = (await this.server.get(this.route + "/" + id)).data;
    return data.map((item) => new ValuationAttributes(item));
  }

  async create(
    valuation: ValuationDTOAttributes
  ): Promise<ValuationAttributes> {
    return (await this.server.post(this.route, valuation)).data;
  }
}
