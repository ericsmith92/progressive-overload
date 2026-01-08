import { DataTypes, Model, type Optional, type Sequelize } from "sequelize";

export type ExerciseAttributes = {
  id: string;
  name: string;
};

export type ExerciseCreationAttributes = Optional<ExerciseAttributes, "id">;

export class Exercise
  extends Model<ExerciseAttributes, ExerciseCreationAttributes>
  implements ExerciseAttributes
{
  public id!: string;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize): typeof Exercise {
    Exercise.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        tableName: "exercises",
        modelName: "Exercise",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        underscored: true,
      }
    );

    return Exercise;
  }
}
