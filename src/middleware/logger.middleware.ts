import type { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const { method, path, headers } = req;
  const { host, "user-agent": userAgent } = headers;

  console.log({
    level: "info",
    method,
    path,
    headers: {
      host,
      userAgent,
    },
  });

  next();
};
