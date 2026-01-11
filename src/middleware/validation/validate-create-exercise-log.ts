import type { Request, Response, NextFunction } from "express";
import type { TypedRequestBody } from "../../types/express.js";
import type { CreateExerciseLogBody } from "../../types/types.js";

export const validateCreateExerciseLog = (
  req: TypedRequestBody<CreateExerciseLogBody>,
  res: Response,
  next: NextFunction
) => {
  const { userId, exerciseId, weight } = req.body;

  if (userId == null || exerciseId == null || weight == null) {
    return res.status(400).json({ ok: false });
  }

  for (const key of Object.keys(req.body)) {
    const value = req.body[key as keyof CreateExerciseLogBody];

    switch (key) {
      case "userId":
      case "exerciseId":
        if (typeof value !== "string" || "" === value?.trim()) {
          return res.status(400).json({ ok: false });
        }
        break;
      case "weight":
        if (typeof value !== "number" || value <= 0) {
          return res.status(400).json({ ok: false });
        }
        break;
      default:
        return res.status(400).json({ ok: false });
    }
  }

  next();
};
