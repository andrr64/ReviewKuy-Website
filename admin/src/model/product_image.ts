export class ProductImage {
    imageUrl: string;

    constructor(imageUrl: string) {
        this.imageUrl = imageUrl;
    }

    copy(): ProductImage {
        return new ProductImage(this.imageUrl);
    }

    setImageUrl(imageUrl: string): void {
        this.imageUrl = imageUrl;
    }
}
