import type { Request, Response, NextFunction } from "express";

export const validateCreateExercise = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  if (name == null) {
    return res.status(400).json({ ok: false });
  }

  for (const key of Object.keys(req.body)) {
    const value = req.body[key];

    switch (key) {
      case "name":
        if (typeof value !== "string" || "" === value?.trim()) {
          return res.status(400).json({ ok: false });
        }
        break;
      default:
        return res.status(400).json({ ok: false });
    }
  }

  next();
};
