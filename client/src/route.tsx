export const routes = {
    home: '/',
    product: '/product/:id',
    productBy: {
        category: '/kategori/:id',
        brand: '/merek/:id'
    },
    get: {
        product: (productId: any) => {
            return `/product/${productId}`
        },
        productBy: {
            brand: (brandId: any) => {
                return `/merek/${brandId}`
            }
        }
    }
}