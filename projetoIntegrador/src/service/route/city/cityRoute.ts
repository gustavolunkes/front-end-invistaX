import type { AxiosInstance } from "axios";
import { CityAttributes } from "./city";

export class CityRoute {
    server: AxiosInstance;
    route: string;

    constructor (server : AxiosInstance) {
        this.server = server;
        this.route = "/city"
    }

    async getByCity(id: number): Promise<CityAttributes> {
        const data = (await this.server.get(this.route + "/" + id)).data;
        return new CityAttributes(data);
    }
}