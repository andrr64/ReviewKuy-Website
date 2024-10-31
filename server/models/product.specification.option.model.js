import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const ProductSpecificationOption = sequelize.define('product.specification.option', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Untuk memastikan opsi tidak duplikat, seperti GPU, CPU, dll.
    },
}, {
    timestamps: false, // Karena ini hanya daftar tetap, kita bisa mematikan timestamps jika tidak diperlukan.
});

export default ProductSpecificationOption;
