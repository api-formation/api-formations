import express from "express";
import cors from "cors";
import { swaggerSpec } from "./swagger.js";
import swaggerUI from "swagger-ui-express";
import formationsRoutes from "./routes/formation.route.js";
import connectMongo from "./configs/db.mongo.js"; 
import { connectPostgreSQL } from "./configs/db.postgres.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ message: "API OK" }));
app.use("/api/formations", formationsRoutes);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

// 🚀 Bootstrapping de l'appli
const startServer = async () => {
  try {
    // Connexion aux BDD
    await connectPostgreSQL();
    await connectMongo();

    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}/`);
    });
  } catch (err) {
    console.error("❌ Erreur au démarrage du serveur :", err);
    process.exit(1);
  }
};

startServer();

export default app;