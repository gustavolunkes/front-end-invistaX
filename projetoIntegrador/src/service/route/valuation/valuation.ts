import {ImovelAttributes} from "service/route/imovel/imovel"

export class ValuationAttributes {

    id: number;
    nameResponsible: string;
    date: Date; 
    description: string;
    rotaImage: string;
    value: number;
    imovel: ImovelAttributes;

    constructor({id, nameResponsible, date, description, rotaImage, value, imovel}: ValuationAttributes) {
        this.id = id;
        this.nameResponsible = nameResponsible;
        this.date = date;
        this.description = description;
        this.rotaImage = rotaImage;
        this.value = value;
        this.imovel = new ImovelAttributes(imovel);
    }
}

export interface ValuationDTOAttributes{
    nameResponsible: string
    date: Date
    description: string
    rotaImage: string
    value: Number
    imovelId: Number
}