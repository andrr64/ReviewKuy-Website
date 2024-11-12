import sequelize from "../db";
import { DataTypes } from "sequelize";

const BannedModel = sequelize.define('banned', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Misalnya, default-nya true untuk banned yang aktif
    },
    permanent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Default false, karena tidak semua banned permanen
    },
    end: {
        type: DataTypes.DATE,
        allowNull: true, // Diizinkan null jika `permanen` true
    },
});

export default BannedModel;