export class ProductSpecificationOption {
    id: number;
    name: string;

    constructor(data: any) {
        this.name = data.name;
        this.id = data.id;
    }

    copy(): ProductSpecificationOption {
        return new ProductSpecificationOption({
            name: this.name,
            id: this.id
        });
    }

    setName(name: string): void {
        this.name = name;
    }
}
