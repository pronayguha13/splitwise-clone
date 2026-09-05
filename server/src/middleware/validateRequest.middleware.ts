import type { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodError, type ZodType } from "zod";

import { HttpError } from "../errors/httpError";
import { replaceRequestQuery } from "../utils/request.util";

type RequestSchema = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

const formatZodError = (error: ZodError) =>
  error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

export const validateRequest = (schema: RequestSchema): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }

      if (schema.params) {
        req.params = schema.params.parse(req.params) as typeof req.params;
      }

      if (schema.query) {
        replaceRequestQuery(req, schema.query.parse(req.query) as typeof req.query);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(new HttpError(400, "Invalid request payload", formatZodError(error)));
        return;
      }

      next(error);
    }
  };
};
