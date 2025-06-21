import { StateAttributes } from "../state/state";


export class CityAttributes {
    id: number;
    nome: string;
    state: StateAttributes;

    constructor({ id, nome, state }: CityAttributes) {
        this.id = id;
        this.nome = nome;
        this.state = new StateAttributes(state);
    }
}