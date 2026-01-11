import express from "express";
import { sequelize } from "./config/db.js";
import { initModels } from "./db/models/index.js";
import router from "./routes/index.js";
import * as middleware from "./middleware/index.js";

await sequelize.authenticate();
initModels(sequelize);

const app = express();
app.use(express.json());
app.use(middleware.logger);
app.use(router);
app.use(middleware.notFound);
app.use(middleware.errorHandler);

const port = Number(process.env.PORT ?? "3000");

app.listen(port, () => {
  console.log(`API listening on http://localhost${port}`);
});
