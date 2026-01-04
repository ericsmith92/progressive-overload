import express from "express";
import { assertDbConnection, sequelize } from "./config/db.js";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/db-check", async (req, res, next) => {
  try {
    await assertDbConnection();

    const [result] = await sequelize.query("select now() as now");
    res.json({ ok: true, result });
  } catch (error) {
    next(error);
  }
});

app.use(
  (
    err: unknown,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).json({ ok: false });
  }
);

const port = Number(process.env.PORT ?? "3000");

app.listen(port, () => {
  console.log(`API listening on http://localhost${port}`);
});
