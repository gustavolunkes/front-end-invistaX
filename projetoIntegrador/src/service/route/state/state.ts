export class StateAttributes {
    name: string
    id: number

    constructor({id, name}: StateAttributes) {
        this.id = id
        this.name = name
    }
}