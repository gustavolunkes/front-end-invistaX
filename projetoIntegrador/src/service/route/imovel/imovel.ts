import { AddressAttributes } from "../address/address";
import { OwnerAttributes } from "../owner/owner";
import { UserAttributes } from "../user/user";

export class ImovelAttributes {
  id_imovel: number;
  nome_imovel: string;
  valueRegistration: number;
  date_Value: string;
  ativo: boolean;
  owner: OwnerAttributes;
  user: UserAttributes;
  adress: AddressAttributes;

  constructor({
    id_imovel,
    nome_imovel,
    valueRegistration,
    date_Value,
    ativo,
    owner,
    user,
    adress,
  }: ImovelAttributes) {
    this.id_imovel = id_imovel;
    this.nome_imovel = nome_imovel;
    this.valueRegistration = valueRegistration;
    this.date_Value = date_Value;
    this.ativo = ativo;
    this.owner = new OwnerAttributes(owner);
    this.user = new UserAttributes(user);
    this.adress = new AddressAttributes(adress);
  }

  formatCurrency() {
    const numericValue = parseFloat(this.valueRegistration.toString());
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numericValue);
  }
}

export interface ImovelDTOAttributes {
  nomeImovel: string;
  street: string;
  number: number;
  neighborhood: string;
  valueRegistration: string;
  dateValue: Date;
  cityId: number;
  cep: number;
  userId: string;
  ownerId: number;
}
