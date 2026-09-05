import type { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import mongoose from "mongoose";

import { replaceRequestQuery } from "../utils/request.util";

type SanitizableValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | SanitizableValue[]
  | { [key: string]: SanitizableValue };

const isPlainObject = (value: unknown): value is Record<string, SanitizableValue> =>
  Object.prototype.toString.call(value) === "[object Object]";

const sanitizeMongoOperators = (value: SanitizableValue): SanitizableValue => {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeMongoOperators(item));
  }

  if (!isPlainObject(value)) {
    return value;
  }

  return Object.entries(value).reduce<Record<string, SanitizableValue>>(
    (sanitized, [key, nestedValue]) => {
      if (key.startsWith("$") || key.includes(".")) {
        return sanitized;
      }

      sanitized[key] = sanitizeMongoOperators(nestedValue);
      return sanitized;
    },
    {},
  );
};

export const securityHeaders = helmet();

export const mongoSanitizer = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  req.body = sanitizeMongoOperators(req.body);
  req.params = sanitizeMongoOperators(req.params) as typeof req.params;
  replaceRequestQuery(req, sanitizeMongoOperators(req.query as SanitizableValue) as typeof req.query);
  next();
};

export const configureMongooseSecurity = (): void => {
  mongoose.set("sanitizeFilter", true);
};
