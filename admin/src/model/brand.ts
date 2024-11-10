export class Brand {
    id: number;
    name: string;
    description: string;
    logo_url: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.logo_url = data.logo_url;
    }

    // Fungsi untuk membuat salinan dari objek Brand
    copy(): Brand {
        return new Brand({
            id: this.id,
            name: this.name,
            description: this.description,
            logo_url: this.logo_url
        });
    }

    // Setter untuk description
    setDescription(description: string): void {
        this.description = description;
    }

    // Setter untuk name
    setName(name: string): void {
        this.name = name;
    }
    toForm() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            logo_url: this.logo_url
        }
    }
    // Setter untuk logo_url
    setLogoUrl(logo_url: string): void {
        this.logo_url = logo_url;
    }
}