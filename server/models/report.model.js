import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import ReportCategoryModel from "./report.category.js";
import User from "./user.model.js";

const ReportModel = sequelize.define('report', {
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
            onDelete: 'CASCADE'
        },
    },
    report_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ReportCategoryModel, // Gunakan string nama tabel, tidak perlu impor model lain di sini
            key: 'id',
        },
        onDelete: 'CASCADE'
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default ReportModel;