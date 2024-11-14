export class CategoryModel {
    id: any;
    name: string;
    image_url: string;

    constructor(data: any){
        this.id = data.id;
        this.name = data.name;
        this.image_url= data.image_url;
    }
}