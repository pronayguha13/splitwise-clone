import dotenv  from 'dotenv';
import cors from "cors";
import express from "express";

import { errorHandler, notFound } from "./middleware/error.middleware.js";
import { mongoSanitizer, securityHeaders } from "./middleware/security.middleware";
import { authRateLimiter } from "./middleware/rateLimit.middleware.js";

import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();
app.use(securityHeaders);

const allowedOrigins = [
    process.env.CLIENT_ORIGIN,
    "http://localhost:3000",
    "http://localhost:5173",
].filter(Boolean) as string[];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
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
