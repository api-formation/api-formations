import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { swaggerSpec } from "./swagger.js";
import swaggerUI from "swagger-ui-express";
import formationsRoutes from "./routes/formation.route.js";
import formationsSuiviesRoutes from "./routes/training-followed.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import session from "express-session";
import { globalRateLimiter } from  "./middleware/ratelimiter.middleware.js";
import { errorHandler } from "./middleware/error.handler.middleware.js";
import { corsOptions } from "./middleware/cors.middleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "test-secret",
    resave: false,
    saveUninitialized: true, // très important pour créer req.session automatiquement
    cookie: { secure: false } // secure=false pour tests sans HTTPS
}));

if (process.env.NODE_ENV === "test") {
    app.use((req, res, next) => {
        if (!req.session.role) req.session.role = "admin"; // juste assigner le rôle
        next();
    });
}
// Routes
app.get("/", (req, res) => res.json({ message: "API OK" }));
app.use("/api/formations", formationsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/formationssuivies", formationsSuiviesRoutes);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(helmet());
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(globalRateLimiter);
app.use(errorHandler);

export default app;