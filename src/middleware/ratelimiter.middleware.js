import rateLimit from "express-rate-limit";

export const globalRateLimiter = rateLimit({
  windowMs: Number(process.env.RATE_GLOBAL_WINDOW_MS) || 60_000,
  max: Number(process.env.RATE_GLOBAL_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
});
