import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { swaggerSpec } from "./swagger.js";
import swaggerUI from "swagger-ui-express";
import formationsRoutes from "./routes/formation.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import { connectMongoDB } from "./configs/db.mongo.js";
import { connectPostgreSQL } from "./configs/db.postgres.js";
import { corsOptions } from "./config/cors.js";
import { globalRateLimiter } from "./middlewares/rateLimiter.js";
import session from "express-session";
import { errorHandler } from "./middlewares/error.middleware.js";
import formationsSuiviesRoutes from "./routes/training-followed.route.js";
const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(globalRateLimiter);
app.use(errorHandler);

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
app.use("/api/formationssuivies", formationsSuiviesRoutes);
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
