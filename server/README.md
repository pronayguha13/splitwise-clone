# Splitwise Clone Server

Node.js, Express, MongoDB, and TypeScript API setup.

## Setup

```sh
pnpm install
cp .env.example .env
pnpm dev
```

## Environment

- `PORT`: API port. Defaults to `5000`.
- `MONGO_URI`: MongoDB connection string.
- `CLIENT_ORIGIN`: Frontend origin allowed by CORS.
- `ROOT_RATE_LIMIT_WINDOW_MS`: Root endpoint rate-limit window in milliseconds. Defaults to `900000`.
- `ROOT_RATE_LIMIT_MAX_REQUESTS`: Root endpoint max requests per IP per window. Defaults to `100`.
- `HEALTH_RATE_LIMIT_WINDOW_MS`: Health endpoint rate-limit window in milliseconds. Defaults to `60000`.
- `HEALTH_RATE_LIMIT_MAX_REQUESTS`: Health endpoint max requests per IP per window. Defaults to `30`.
- `AUTH_RATE_LIMIT_WINDOW_MS`: Auth endpoint rate-limit window in milliseconds. Defaults to `900000`.
- `AUTH_RATE_LIMIT_MAX_REQUESTS`: Auth endpoint max requests per IP per window. Defaults to `5`.

## Rate limiting

Per-endpoint rate limiters are defined in `src/middleware/rateLimit.middleware.ts`.
They are not wired globally. Apply them directly to specific routes when needed.

## Request security

Global hardening is defined in `src/middleware/security.middleware.ts`.

- `securityHeaders`: applies Helmet HTTP security headers.
- `mongoSanitizer`: removes MongoDB operator-style keys such as `$ne` and dotted keys from request data.
- `configureMongooseSecurity`: enables Mongoose `sanitizeFilter`.

Route-level validation is handled by `src/middleware/validateRequest.middleware.ts`.
Define endpoint schemas with Zod in `src/schemas`, then attach them to routes:

```ts
router.post("/signup", validateRequest(signupSchema), handler);
```

Schemas should use `.strict()` for request bodies so unexpected fields are rejected instead of silently accepted.

## Scripts

- `pnpm dev`: Start the API with `tsx` in watch mode.
- `pnpm build`: Compile TypeScript to `dist`.
- `pnpm start`: Start the compiled API with Node.

## Endpoints

- `GET /`: API welcome response.
- `GET /api/health`: API and database health check.
