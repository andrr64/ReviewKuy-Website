export class UserModel {
    id: number;
    name: string;
    email: string;
    avatar: string;

    constructor(data: any){
        this.id= data.id;
        this.name= data.name;
        this.email= data.email;
        this.avatar= data.avatar;
    }
}