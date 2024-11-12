import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Product from './product.model.js';
import ProductSpecificationOptionModel from './product.specification.option.model.js';

const ProductSpecificationModel = sequelize.define('product.specification', {
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
            model: ProductSpecificationOptionModel,
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


export default ProductSpecificationModel;
