import express, { type Router } from "express";
import { User } from "../db/models/user.model.js";
import { validateCreateUser } from "../middleware/validation/validate-create-user.js";

const router: Router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateCreateUser, async (req, res, next) => {
  try {
    const { email, displayName } = req.body;

    const user = await User.create({
      email: email ?? null,
      displayName: displayName ?? null,
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
