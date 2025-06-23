import { ImovelAttributes } from "../imovel/imovel";


export class RenevueAttributes {

    id: number;
    title: string;
    description: string;
    value: number;
    date: Date;
    imovel: ImovelAttributes;

    constructor({id, title, description, value, date, imovel}: RenevueAttributes) {
        this.id = id;
        this.title = title;
        this. description = description;
        this.value = value;
        this.date = date;
        this.imovel = new ImovelAttributes(imovel);
    }
}

export interface RenevueDTOAttributes {
    title: string;
    description: string;
    value: number;
    date: Date;
}