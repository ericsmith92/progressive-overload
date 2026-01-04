import type { Sequelize } from "sequelize";
import { User } from "./user.model.js";

export const initModels = (sequelize: Sequelize) => {
  User.initModel(sequelize);

  return {
    User,
  };
};
