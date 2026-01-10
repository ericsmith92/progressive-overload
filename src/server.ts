import express from "express";
import { sequelize } from "./config/db.js";
import { initModels } from "./db/models/index.js";
import router from "./routes/index.js";

await sequelize.authenticate();
initModels(sequelize);

const app = express();
app.use(express.json());
app.use(router);

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
