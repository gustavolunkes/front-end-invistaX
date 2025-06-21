import type { AxiosInstance } from "axios";
import { ImovelAttributes, type ImovelDTOAttributes } from "./imovel";

export class ImovelRoute {
  server: AxiosInstance;
  route: string;
  constructor(server: AxiosInstance) {
    this.server = server;
    this.route = "/imovel";
  }

  async getAll(id: string): Promise<ImovelAttributes[]> {
    const data = (await this.server.get(this.route + "/" + id))?.data;
    return data.map((item) => new ImovelAttributes(item));
  }

  async getByImovel(id: Number): Promise<ImovelAttributes> {
    const data = (await this.server.get(this.route + "/" + id)).data;
    return new ImovelAttributes(data);
  }

  async createByImovel(imovel: ImovelDTOAttributes): Promise<ImovelAttributes> {
    return (await this.server.post(this.route + "/imovel", imovel)).data;
  }

  async deleteByImovel(id: number): Promise<void> {
    return await this.server.delete(this.route + "/imovel/" + id);
  }

  async updateByIMovel(
    imovel: Partial<ImovelDTOAttributes>,
    id: number
  ): Promise<ImovelAttributes> {
    return (await this.server.put(this.route + "/imovel/" + id, imovel)).data;
  }
}
