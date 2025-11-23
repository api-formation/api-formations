export const corsOptions = {
    origin: (origin, callback) => {
        // adapter selon votre front (ex: "http://localhost:3000")
        callback(null, true);
    },
    credentials: true, // <--- important pour accepter les cookies
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};