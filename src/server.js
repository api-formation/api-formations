import app from "./app.js";
import connectMongo from "./configs/db.mongo.js";
import { connectPostgreSQL } from "./configs/db.postgres.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectMongo();
        await connectPostgreSQL();

        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}/`);
        });
    } catch (err) {
        console.error("❌ Failed to start server:", err);
        process.exit(1);
    }
};

startServer();
