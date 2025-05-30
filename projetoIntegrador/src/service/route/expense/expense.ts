import { ImovelAttributes } from "../imovel/imovel";

export class ExpenseAttributes {

    id: number;
    title: string;
    description: string;
    value: number;
    date: Date;
    imovel: ImovelAttributes

    constructor ({id, title, description, value, date, imovel}: ExpenseAttributes) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.value = value;
        this.date = date;
        this.imovel = new ImovelAttributes(imovel);
    }
}

export interface ExpenseDTOAttributes{
    title: string,
    description: string,
    value: string,
    date: Date,
    imovelId: Number
}