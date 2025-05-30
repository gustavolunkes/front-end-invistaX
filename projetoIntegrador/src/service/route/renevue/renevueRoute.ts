import type { AxiosInstance } from "axios";
import { RenevueAttributes, type RenevueDTOAttributes } from "./renevue";


export class RenevueRoute {
    server: AxiosInstance
    route: string
    constructor(server: AxiosInstance) {
        this.server = server;
        this.route = "/renevue" 
    }

    async getByRenevue(id: number): Promise<RenevueAttributes> {
        const data = (await this.server.get(this.route + "/imovel/" + id)).data;
        return new RenevueAttributes(data);
    }

    async createByRenevue(renevue: RenevueDTOAttributes): Promise<RenevueAttributes> {
        return (await this.server.post(this.route + "/renevue", renevue)).data;
    }

    async deleteByRenevue(id:number): Promise<void> {
        return (await this.server.delete(this.route + "/renevue/" + id))
    }

    async updateByRenevue(renevue:Partial<RenevueDTOAttributes>, id:number): Promise<RenevueAttributes> {
        return (await this.server.put(this.route + "/renevue/" + id, renevue)).data;
    }
}
