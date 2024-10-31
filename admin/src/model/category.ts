export class Category {
    id: number;
    name: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
    }

    // Fungsi untuk membuat salinan dari objek Category
    copy(): Category {
        return new Category({
            id: this.id,
            name: this.name
        });
    }

    // Setter untuk name
    setName(name: string): void {
        this.name = name;
    }
}
