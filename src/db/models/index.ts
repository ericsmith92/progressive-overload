import type { Sequelize } from "sequelize";
import { User } from "./user.model.js";
import { Exercise } from "./exercise.model.js";

export const initModels = (sequelize: Sequelize) => {
  User.initModel(sequelize);
  Exercise.initModel(sequelize);

  return {
    User,
    Exercise,
  };
};
