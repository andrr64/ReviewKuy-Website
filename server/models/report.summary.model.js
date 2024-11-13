import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./user.model.js";

const ReportSummary = sequelize.define('report.summary', {
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
    number_of_reports: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

export default ReportSummary;