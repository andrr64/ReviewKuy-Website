import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./user.model.js";
import Product from "./product.model.js";

const Review = sequelize.define('review', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        onDelete: 'CASCADE',
        index: true, 
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id',
        },
        onDelete: 'CASCADE',
        index: true, 
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [5, 100] // Menambahkan validasi panjang
        }
    },
    review: {
        type: DataTypes.TEXT, // Menggunakan TEXT untuk ulasan yang lebih panjang
        allowNull: false,
        validate: {
            len: [10, 5000] // Menambahkan validasi panjang maksimum
        }
    },
    rating: {
        type: DataTypes.INTEGER, // Menggunakan tipe INTEGER untuk rating
        allowNull: false,
        validate: {
            min: 1, // Nilai minimum 1
            max: 5, // Nilai maksimum 5
            isInt: true, // Memastikan bahwa nilai adalah bilangan bulat
        }
    }
}, {
    timestamps: true,
});

export default Review;
