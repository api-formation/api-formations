import express from "express";
import { listUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { validateUserCreate, validateUserUpdate } from "../middleware/validation.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const userRoutes = express.Router();

userRoutes.get("/",authMiddleware, listUsers); 
userRoutes.get("/:id",authMiddleware, getUser);
userRoutes.post("/",authMiddleware, validateUserCreate, createUser);
userRoutes.put("/:id",authMiddleware, validateUserUpdate, updateUser);
userRoutes.delete("/:id",authMiddleware, deleteUser);

export default userRoutes;