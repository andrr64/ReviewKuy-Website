export class ProductSpecification {
    spec_opt_id: number;
    value: string;

    constructor(data: any) {
        this.spec_opt_id = data.spec_opt_id;
        this.value = data.value;
    }
}
