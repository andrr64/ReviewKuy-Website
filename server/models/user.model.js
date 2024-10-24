import mongoose from "mongoose";

const userAccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        default: 'https://to.do'
    }
}, {timestamps: true});

export const UserAccount = mongoose.model('account', userAccountSchema);