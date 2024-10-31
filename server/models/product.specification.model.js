import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Product from './product.model.js';
import ProductSpecificationOption from './product.specification.option.model.js';

const ProductSpecification = sequelize.define('product.specification', {
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
            model: Product,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    spec_opt_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProductSpecificationOption,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    index: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});


export default ProductSpecification;
