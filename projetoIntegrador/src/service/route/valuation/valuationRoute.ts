import type { AxiosInstance } from "axios";
import { ValuationAttributes, type ValuationDTOAttributes } from "./valuation";

export class ValuationRoute {
  server: AxiosInstance;
  route: string;

  constructor(server: AxiosInstance) {
    this.server = server;
    this.route = "/valuation"
  }

  async getByIdPropertie(id: Number): Promise<ValuationAttributes[]> {
    return (await this.server.get(this.route + "/valuation/" + id)).data;
  }
  async create(
    valuation: ValuationDTOAttributes
  ): Promise<ValuationAttributes> {
    console.log(valuation);
    return (await this.server.post(this.route + "/valuation", valuation)).data;
  }
}
