import express, { type Router } from "express";
import exerciseLogsRouter from "./exercise-logs.routes.js";
import exercisesRouter from "./exercises.routes.js";
import healthRouter from "./health.routes.js";
import usersRouter from "./users.routes.js";

const router: Router = express.Router();

// router.get("/boom", (req, res, next) => {
//   next(new Error("Test error"));
// });

router.use("/exercises", exercisesRouter);
router.use("/exercise-logs", exerciseLogsRouter);
router.use("/health", healthRouter);
router.use("/users", usersRouter);

export default router;
