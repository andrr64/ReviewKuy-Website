export class UserModel {
    name: string;
    email: string;
    avatar: string;

    constructor(data: any){
        this.name= data.name;
        this.email= data.email;
        this.avatar= data.avatar;
    }

    copy(){
        return new UserModel({
            name: this.name,
            email: this.email,
            avatar: this.avatar
        })
    }
}