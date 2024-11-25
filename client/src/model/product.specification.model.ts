export class ProductSpecificationModel {
    name: string;
    value: string;
    
    constructor(data: any) {
        this.name = data.name;
        this.value = data.value;
    }
}
