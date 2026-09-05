import type { ErrorRequestHandler, RequestHandler } from "express";

import { HttpError } from "../errors/httpError";

export const notFound: RequestHandler = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const statusCode =
    err instanceof HttpError ? err.statusCode : res.statusCode === 200 ? 500 : res.statusCode;
  const response: {
    message: string;
    details?: unknown;
    stack?: string;
  } = {
    message: err instanceof Error ? err.message : "Server error",
  };

  if (err instanceof HttpError && err.details) {
    response.details = err.details;
  }

  if (process.env.NODE_ENV !== "production" && err instanceof Error) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};
