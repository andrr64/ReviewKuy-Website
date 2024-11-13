import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./user.model.js";
import Review from "./review.model.js";

const ReviewVoteModel = sequelize.define('review.vote', {
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
    review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Review,
            key: 'id',
        },
        onDelete: 'CASCADE',
        index: true, 
    },
    value: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

export default ReviewVoteModel;