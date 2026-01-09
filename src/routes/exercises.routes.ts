import express, { type Router } from "express";
import { Exercise } from "../db/models/exercise.model.js";

const router: Router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const exercises = await Exercise.findAll();

    res.status(200).json(exercises);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;

    const exercise = await Exercise.create({
      name,
    });

    res.status(201).json(exercise);
  } catch (error) {
    next(error);
  }
});

export default router;
