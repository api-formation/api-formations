import express from "express";
import cors from "cors";
//import { swaggerSpec } from "./swagger.js";
import formationsRoutes from "./routes/formation.route.js";
import { connectMongoDB } from "./configs/db.mongo.js";
import { connectPostgreSQL } from "./configs/db.postgres.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectMongoDB();
connectPostgreSQL();

app.get("/", (req, res) => res.json({ message: "API OK" }));
app.use("/api/formations", formationsRoutes);
//app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(` Server running on http://localhost:${PORT}/`)
);

export default app;
