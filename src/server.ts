import express from "express";
import { assertDbConnection, sequelize } from "./config/db.js";
import { initModels } from "./db/models/index.js";
import { User } from "./db/models/user.model.js";

await sequelize.authenticate();
initModels(sequelize);

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

app.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

app.post("/users", async (req, res, next) => {
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
