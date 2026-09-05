import rateLimit, { type Options } from "express-rate-limit";

type RateLimiterConfig = Pick<Options, "windowMs" | "max" | "message">;

const createRateLimiter = ({ windowMs, max, message }: RateLimiterConfig) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message,
  });

export const rootRateLimiter = createRateLimiter({
  windowMs: Number(process.env.ROOT_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
  max: Number(process.env.ROOT_RATE_LIMIT_MAX_REQUESTS || 100),
  message: {
    message: "Too many requests, please try again later.",
  },
});

export const healthRateLimiter = createRateLimiter({
  windowMs: Number(process.env.HEALTH_RATE_LIMIT_WINDOW_MS || 60 * 1000),
  max: Number(process.env.HEALTH_RATE_LIMIT_MAX_REQUESTS || 30),
  message: {
    message: "Too many health check requests, please try again later.",
  },
});

export const authRateLimiter = createRateLimiter({
  windowMs: Number(process.env.AUTH_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
  max: Number(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS || 5),
  message: {
    message: "Too many authentication attempts, please try again later.",
  },
});

export const createEndpointRateLimiter = (config: RateLimiterConfig) =>
  rateLimit({
    ...config,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  });
