import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
import { swaggerSpec } from "./swagger.js";
import swaggerUI from "swagger-ui-express";
import formationsRoutes from "./routes/formation.route.js";
import formationsSuiviesRoutes from "./routes/training-followed.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import { globalRateLimiter } from  "./middleware/ratelimiter.middleware.js";
import { errorHandler } from "./middleware/error.handler.middleware.js";
import { corsOptions } from "./middleware/cors.middleware.js";

const app = express();

app.use(helmet());
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "test-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "lax"
    }
}));

app.use(morgan("combined"));
app.use(globalRateLimiter);

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
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, {
    swaggerOptions: {
        requestInterceptor: (req) => {
            req.credentials = 'include';
            return req;
        }
    }
}));
app.use(errorHandler);
export default app;