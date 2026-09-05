import type { Request } from "express";

export const replaceRequestQuery = (req: Request, query: Request["query"]): void => {
  Object.defineProperty(req, "query", {
    value: query,
    writable: true,
    configurable: true,
    enumerable: true,
  });
};
