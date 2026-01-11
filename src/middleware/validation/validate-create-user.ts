import type { Response, NextFunction } from "express";
import type { TypedRequestBody } from "../../types/express.js";
import type { CreateUserBody } from "../../types/types.js";

export const EMAIL_REGEX: RegExp =
  /^(?!\.)(?!.*\.\.)[A-Z0-9._%+-]{1,64}(?<!\.)@[A-Z0-9-]+(\.[A-Z0-9-]+)*\.[A-Z]{2,}$/i;

export const validateCreateUser = (
  req: TypedRequestBody<CreateUserBody>,
  res: Response,
  next: NextFunction
) => {
  const { displayName } = req.body;

  if (displayName == null) {
    return res.status(400).json({ ok: false });
  }

  for (const key of Object.keys(req.body)) {
    const value = req.body[key as keyof CreateUserBody];

    switch (key) {
      case "displayName":
        if (typeof value !== "string" || "" === value?.trim()) {
          return res.status(400).json({ ok: false });
        }
        break;
      case "email":
        if (
          typeof value !== "string" ||
          "" === value?.trim() ||
          !EMAIL_REGEX.test(value.trim())
        ) {
          return res.status(400).json({ ok: false });
        }
        break;
      default:
        return res.status(400).json({ ok: false });
    }
  }

  next();
};
