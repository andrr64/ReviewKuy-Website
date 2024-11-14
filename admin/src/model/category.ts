export class Category {
    id: number;
    name: string;
    image_url: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.image_url= data.image_url;
    }

    // Fungsi untuk membuat salinan dari objek Category
    copy(): Category {
        return new Category({
            id: this.id,
            name: this.name,
            image_url: this.image_url
        });
    }

    // Setter untuk name
    setName(name: string): void {
        this.name = name;
    }
}
