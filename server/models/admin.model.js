import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Admin = sequelize.define('admin', {
    admin_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default Admin;
