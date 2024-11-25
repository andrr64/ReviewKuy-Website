import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Category from './category.model.js';
import Brand from './brand.model.js';

const ProductModel = sequelize.define('product', {
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
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category, // Gunakan string nama tabel
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0, // Harga minimal 0
        }
    }
}, {
    timestamps: true,
});


export default ProductModel;
