import type { Request, Response } from "express";

export const errorHandler = (err: unknown, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ ok: false });
};
