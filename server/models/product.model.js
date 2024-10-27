import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Category from './category.model.js';
import Brand from './brand.model.js';

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Brand, // Gunakan string nama tabel, tidak perlu impor model lain di sini
            key: 'brand_id',
        },
        onDelete: 'CASCADE',
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category, // Gunakan string nama tabel
            key: 'category_id',
        },
        onDelete: 'CASCADE',
    },
}, {
    timestamps: true,
});


export default Product;
