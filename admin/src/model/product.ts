class ProductSpecification {
    name: string;
    value: string;

    constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }
}

class ProductImage {
    imageUrl: string;

    constructor(imageUrl: string) {
        this.imageUrl = imageUrl;
    }
}

class Brand {
    id: number;
    name: string; // Anda bisa menambahkan atribut lain yang relevan
    description: string;
    logo_url: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.logo_url = data.logo_url;
    }
}

class Category {
    id: number;
    name: string; // Anda bisa menambahkan atribut lain yang relevan

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export class ProductModel {
    id: number;
    name: string;
    description?: string; // Optional jika tidak selalu ada
    brand: Brand;
    category: Category;
    specifications: ProductSpecification[];
    pictures: ProductImage[];

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.brand = new Brand(data.brand);
        this.category = new Category(data.category.id, data.category.name);
        this.specifications = data.specifications.map((spec: any) => new ProductSpecification(spec.name, spec.value));
        this.pictures = data.pictures.map((pic: any) => new ProductImage(pic));
    }

    // Salinan data
    copy(): ProductModel {
        return new ProductModel({
            id: this.id,
            name: this.name,
            description: this.description,
            brand: { id: this.brand.id, name: this.brand.name },
            category: { id: this.category.id, name: this.category.name },
            specifications: this.specifications.map(spec => ({ name: spec.name, value: spec.value })),
            pictures: this.pictures.map(pic => pic.imageUrl)
        });
    }

    // Mengubah gambar berdasarkan indeks
    changeImage(index: number, url: string): void {
        if (index >= 0 && index < this.pictures.length) {
            this.pictures[index].imageUrl = url;
        } else {
            console.error("Index gambar tidak valid.");
        }
    }

    // Mengubah nama produk
    changeName(newName: string): void {
        this.name = newName;
    }

    // Mengubah merek produk
    changeBrand(newBrand: Brand): void {
        this.brand = newBrand;
    }

    // Menambahkan spesifikasi baru
    addSpec(newSpec: ProductSpecification): void {
        this.specifications.push(newSpec);
    }

    // Mengubah spesifikasi berdasarkan indeks
    changeSpec(index: number, newSpec: ProductSpecification): void {
        if (index >= 0 && index < this.specifications.length) {
            this.specifications[index] = newSpec;
        } else {
            console.error("Index spesifikasi tidak valid.");
        }
    }

    // Menghapus spesifikasi berdasarkan indeks
    removeSpec(index: number): void {
        if (index >= 0 && index < this.specifications.length) {
            this.specifications.splice(index, 1);
        } else {
            console.error("Index spesifikasi tidak valid.");
        }
    }
}