import express, { type Router } from "express";
import { ExerciseLog } from "../db/models/exercise_log.model.js";
import { validateCreateExerciseLog } from "../middleware/validation/validate-create-exercise-log.js";

const router: Router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const exerciseLogs = await ExerciseLog.findAll();

    res.status(200).json(exerciseLogs);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateCreateExerciseLog, async (req, res, next) => {
  try {
    const { userId, exerciseId, weight } = req.body;
    const performedOn = new Date();

    const exerciseLog = await ExerciseLog.create({
      userId,
      exerciseId,
      performedOn,
      weight,
    });

    res.status(201).json(exerciseLog);
  } catch (error) {
    next(error);
  }
});

export default router;
