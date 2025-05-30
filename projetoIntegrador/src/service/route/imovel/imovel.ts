import { OwnerAttributes } from "service/route/owner/owner"
import { UserAttributes } from "../user/user";

export class ImovelAttributes {
    id: number;
    nome_imovel: string;
    valueRegistration: number;
    localDate: Date;
    ativo: boolean;
    owner: OwnerAttributes;
    user: UserAttributes;

    constructor({id, nome_imovel, valueRegistration, localDate, ativo, owner, user}: ImovelAttributes){
        this.id = id;
        this.nome_imovel = nome_imovel;
        this.valueRegistration = valueRegistration;
        this.localDate = localDate;
        this.ativo = ativo;
        this.owner = new OwnerAttributes(owner);
        this.user = new UserAttributes(user);
    }
}

export interface ImovelDTOAttributes {
    nomeImovel: string
    street: string
    number: number;
    neighborhood: string;
    valueRegistration: number;
    dateValue: Date;
    cityId: number;
    cep: number;
    userId: string;
    ownerId: number;
}