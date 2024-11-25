import express from "express";
import { createUser, loginUser, logoutUser, updateUser } from "../controllers/user.controller.js";
import { verifyAccessToken } from "../middleware/auth.js";
import feature_route from './user.feature.route.js';

const user_route = express.Router();

user_route.post('/', createUser);   
user_route.post('/login', loginUser);
user_route.post('/logout', logoutUser);

user_route.use('/feature', verifyAccessToken, feature_route);

export default user_route;