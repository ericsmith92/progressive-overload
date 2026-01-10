import express, { type Router } from "express";
import { ExerciseLog } from "../db/models/exercise_log.model.js";

const router: Router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const exerciseLogs = await ExerciseLog.findAll();

    res.status(200).json(exerciseLogs);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { userId, exerciseId, performedOn, weight } = req.body;
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
