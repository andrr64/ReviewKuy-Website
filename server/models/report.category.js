import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const ReportCategoryModel = sequelize.define('report.category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default ReportCategoryModel;