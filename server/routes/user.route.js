import express from "express";
import { createUser } from "../controllers/user.controller.js";

const API_User = express.Router();

API_User.post('', createUser);

export default API_User;