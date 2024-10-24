import { UserAccount } from "../models/user.model.js";
import { serverBadRequest, serverOk } from "./response.controller.js";
import bcryptjs from 'bcryptjs';

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await UserAccount.findOne({ email });
    if (existingUser) {
        return serverBadRequest(res, 'Email already exists');
    }
    const hashPassword = await bcryptjs.hash(password, 10);

    const newUser = new UserAccount({
        name,
        email,
        password: hashPassword
    }
    );
    await newUser.save();
    return serverOk(res);
}