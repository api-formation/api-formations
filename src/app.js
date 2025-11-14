import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import formationsRoutes from "./routes/formation.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import formationsSuiviesRoutes from "./routes/training-followed.route.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => res.json({ message: "API OK" }));
app.use("/api/formations", formationsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/formationssuivies", formationsSuiviesRoutes);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default app;
