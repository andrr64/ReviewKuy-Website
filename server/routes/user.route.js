import express from "express";
import { createUser, updateUser } from "../controllers/user.controller.js";

const user_route = express.Router();

user_route.post('/', createUser);
user_route.put('/:userId', updateUser);

export default user_route;