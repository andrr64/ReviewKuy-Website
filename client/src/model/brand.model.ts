export class BrandModel {
    id: any;
    name: string;
    logo_url: string;

    constructor(data: any){
        this.id = data.id;
        this.name = data.name;
        this.logo_url= data.logo_url;
    }
}