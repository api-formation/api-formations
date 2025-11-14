export const corsOptions = {
  origin: process.env.FRONT_ORIGIN?.split(",") || ["http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200,
};
