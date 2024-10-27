import express from "express";
import { createUser, loginUser, logoutUser, updateUser } from "../controllers/user.controller.js";
import { verifyAccessToken } from "../middleware/auth.js";

const user_route = express.Router();

user_route.post('/', createUser);
user_route.put('/:userId',verifyAccessToken, updateUser);
user_route.post('/login', loginUser);
user_route.post('/logout', logoutUser);

export default user_route;