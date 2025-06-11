import type { AxiosInstance } from "axios";
import { ExpenseAttributes, type ExpenseDTOAttributes } from "./expense";

export class ExpenseRoute {
    server: AxiosInstance
    route: string
    constructor(server: AxiosInstance) {
        this.server = server;
        this.route = "/expense" 
    }

    async getByExpense(id: number): Promise<ExpenseAttributes> {
        const data = (await this.server.get(this.route + "/imovel/" + id)).data;
        return new ExpenseAttributes(data);
    }

    async createByExpense(expense: ExpenseDTOAttributes): Promise<ExpenseAttributes> {
        return (await this.server.post(this.route + "/expense", expense)).data;
    }

    async deleteByExpense(id:number): Promise<void> {
        return (await this.server.delete(this.route + "/expense/" + id))
    }

    async updateByExpense(expense:Partial<ExpenseDTOAttributes>, id:number): Promise<ExpenseAttributes> {
        return (await this.server.put(this.route + "/expense/" + id, expense)).data;
    }
}