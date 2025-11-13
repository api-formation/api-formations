import express from "express";
import cors from "cors";
import { swaggerSpec } from "./swagger.js";
import swaggerUI from "swagger-ui-express";
import formationsRoutes from "./routes/formation.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import { connectMongoDB } from "./configs/db.mongo.js";
import { connectPostgreSQL } from "./configs/db.postgres.js";
import session from "express-session";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));



app.get("/", (req, res) => res.json({ message: "API OK" }));
app.use("/api/formations", formationsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));


(async function start(){
  try {
  await connectMongoDB();
  await connectPostgreSQL();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>console.log(` Server running on http://localhost:${PORT}/`));
  }catch (err){
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})()



export default app;
