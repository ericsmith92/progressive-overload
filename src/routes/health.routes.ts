import express, { type Router } from "express";
import { assertDbConnection, sequelize } from "../config/db.js";

const router: Router = express.Router();

router.get("/", (req, res) => {
  res.json({ ok: true });
});

router.get("/db-check", async (req, res, next) => {
  try {
    await assertDbConnection();

    const [result] = await sequelize.query("select now() as now");
    res.json({ ok: true, result });
  } catch (error) {
    next(error);
  }
});

export default router;
