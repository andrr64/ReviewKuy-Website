import { Brand } from "./brand";
import { Category } from "./category";
import { ProductImage } from "./product_image";
import { ProductSpecification } from "./product_specification";

export class ProductModel {
    id: number;
    name: string;
    description: string; // Optional jika tidak selalu ada
    brand: Brand;
    category: Category;
    specifications: ProductSpecification[];
    pictures: ProductImage[];
    price: number;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.brand = new Brand(data.brand);
        this.category = new Category(data.category);
        this.specifications = data.specifications.map((spec: any) => new ProductSpecification(spec));
        this.pictures = data.pictures.map((pic: any) => new ProductImage(pic));
        this.price = data.price;
    }

    formattedPrice(): string {
        return `IDR ${new Intl.NumberFormat('id-ID').format(this.price)}`;
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