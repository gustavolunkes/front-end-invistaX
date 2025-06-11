export class UserAttributes{

    id: number;
    username: string;

    constructor({id, username}: UserAttributes){

        this.id = id;
        this.username = username;

    }
}

export interface UserDTOAttributes {
    username: string;
}