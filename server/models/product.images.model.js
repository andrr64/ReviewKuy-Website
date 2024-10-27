import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Product from './product.model.js';

const ProductImage = sequelize.define('product_image', {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product, // referensi ke tabel Product
            key: 'id',
        },
        onDelete: 'CASCADE', // opsi agar data dihapus jika produk dihapus
    },
    index: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image_url: { // Ganti 'data' menjadi 'image_url'
        type: DataTypes.STRING, // Gunakan STRING untuk menyimpan URL
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default ProductImage;
