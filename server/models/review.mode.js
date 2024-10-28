import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './user.model.js';

const Review = sequelize.define({
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
            model: User, // Gunakan string nama tabel, tidak perlu impor model lain di sini
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    review: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps : true
});

export default Review;