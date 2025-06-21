import type { AxiosInstance } from "axios"
import { OwnerAttributes, type OwnerDTOAttributes } from "./owner"

export class OwnerRoute {
    server: AxiosInstance;
    route: string
    constructor(server: AxiosInstance) {
        this.server = server;
        this.route = "/owner"
    }

    async getByUser(id:string): Promise<OwnerAttributes[]> {
        const data = (await this.server.get(this.route + "/" + id)).data;
        return data.map(item => new OwnerAttributes(item))
    }

    async createByOwner(owner: OwnerDTOAttributes): Promise<OwnerAttributes> {
        return (await this.server.post(this.route + "/owner", owner)).data;
    }

    async updateByOwner(owner:Partial<OwnerDTOAttributes>, id:number): Promise<OwnerAttributes> {
        return (await this.server.put(this.route + "/owner/" + id, owner)).data;
    }

    async deleteByOwner(id:number): Promise<void> {
        return (await this.server.delete(this.route + "/owner/" + id));
    }
}