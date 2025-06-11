import type { AxiosInstance } from "axios";
import { UserAttributes, type UserDTOAttributes } from "./user";

export class UserRoute {
    server: AxiosInstance
    route: string
    constructor(server: AxiosInstance) {
        this.server = server;
        this.route = "/user" 
    }

    async createByUser(user: UserDTOAttributes): Promise<UserAttributes> {
        return (await this.server.post(this.route + "/user", user)).data;
    }
}