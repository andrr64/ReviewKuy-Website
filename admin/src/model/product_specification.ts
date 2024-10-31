export class ProductSpecification {
    name: string;
    value: string;

    constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }

    copy(): ProductSpecification {
        return new ProductSpecification(this.name, this.value);
    }

    setName(name: string): void {
        this.name = name;
    }

    setValue(value: string): void {
        this.value = value;
    }
}
