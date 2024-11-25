export class ProductSpecification {
    spec_opt_id: number;
    value: string;
    name: string;
    constructor(data: any) {
        this.name = data.name;
        this.spec_opt_id = data.spec_opt_id;
        this.value = data.value;
    }
}
