import express from "express";
import { register, login} from "../controllers/auth.controller.js";
import { validateLogin, validateRegister } from "../middleware/validation.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", validateRegister, register);
authRoutes.post("/login", validateLogin, login);

export default authRoutes;