import {CityAttributes} from "service/route/city/city"

export class AddressAttributes {
    id: number;
    street: string;
    number: number;
    neighborhood: string;
    cep: number;
    city: CityAttributes;

    constructor({id, street, number, neighborhood, cep, city}: AddressAttributes) {
        this.id = id
        this.street = street
        this.number = number
        this.neighborhood = neighborhood
        this.cep = cep
        this.city = new CityAttributes(city);
    }
}