import { AddressAttributes } from "../address/address";
import { UserAttributes } from "../user/user";

export class OwnerAttributes {
  id: number;
  name: string;
  cpf_cnpj: number;
  phone: number;
  email: string;
  ativo: true;
  address: AddressAttributes;
  user: UserAttributes;

  constructor({
    id,
    name,
    cpf_cnpj,
    phone,
    email,
    ativo,
    user,
    address,
  }: OwnerAttributes) {
    this.id = id;
    this.name = name;
    this.cpf_cnpj = cpf_cnpj;
    this.phone = phone;
    this.email = email;
    this.ativo = ativo;
    this.user = new UserAttributes(user);
    this.address = new AddressAttributes(address);
  }
}

export interface OwnerDTOAttributes {
  name: string;
  cpf_cnpj: string;
  phone: string;
  email: string;
  street: string;
  number: number;
  neighborhood: string;
  cep: number;
  userId: string;
  cityId: number;
}
