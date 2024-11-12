import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import ProductModel from './product.model.js';

const ProductImageModel = sequelize.define('product.image', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProductModel, // referensi ke tabel Product
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

export default ProductImageModel;
