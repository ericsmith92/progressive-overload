import type { Response, NextFunction } from "express";
import type { TypedRequestBody } from "../../types/express.js";
import type { CreateExerciseBody } from "../../types/types.js";

export const validateCreateExercise = (
  req: TypedRequestBody<CreateExerciseBody>,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  if (name == null) {
    return res.status(400).json({ ok: false });
  }

  for (const key of Object.keys(req.body)) {
    const value = req.body[key as keyof CreateExerciseBody];

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
