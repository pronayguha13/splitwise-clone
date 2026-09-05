import cors from "cors";
import express from "express";

import { errorHandler, notFound } from "./middleware/error.middleware.js";
import { mongoSanitizer, securityHeaders } from "./middleware/security.middleware";
import { authRateLimiter } from "./middleware/rateLimit.middleware.js";

import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(securityHeaders);
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
        credentials: true,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitizer);

app.get("/", (_req, res) => {
    res.status(200).json({
        message: "Splitwise clone API",
    });
});

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRateLimiter, authRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
