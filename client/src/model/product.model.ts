import { BrandModel } from "./brand.model";
import { CategoryModel } from "./category.model";
import { ProductImage as ProductImageModel } from "./product.image.model";
import { ProductSpecificationModel } from "./product.specification.model";

export class ProductModel {
    id: number;
    name: string;
    description: string;
    brand: BrandModel;
    category: CategoryModel;
    specifications: ProductSpecificationModel[];
    pictures: ProductImageModel[];
    
    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.brand = new BrandModel(data.brand);
        this.category = new CategoryModel(data.category);
        this.specifications = data.specifications.map((spec: any) => new ProductSpecificationModel(spec));
        this.pictures = data.pictures.map((pic: any) => new ProductImageModel(pic));
    }
}