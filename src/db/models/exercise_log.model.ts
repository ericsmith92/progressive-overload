import { DataTypes, Model, type Optional, type Sequelize } from "sequelize";

export type ExerciseLogAttributes = {
  id: string;
  userId: string;
  exerciseId: string;
  performedOn: Date;
  weight: string;
};

export type ExerciseLogCreationAttributes = Optional<
  ExerciseLogAttributes,
  "id"
>;

export class ExerciseLog
  extends Model<ExerciseLogAttributes, ExerciseLogCreationAttributes>
  implements ExerciseLogAttributes
{
  public id!: string;
  public userId!: string;
  public exerciseId!: string;
  public performedOn!: Date;
  public weight!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize): typeof ExerciseLog {
    ExerciseLog.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },

        userId: {
          type: DataTypes.UUID,
          references: {
            model: "users",
            key: "id",
          },
          allowNull: false,
          field: "user_id",
        },

        exerciseId: {
          type: DataTypes.UUID,
          references: {
            model: "exercises",
            key: "id",
          },
          allowNull: false,
          field: "exercise_id",
        },

        performedOn: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: "performed_on",
        },

        weight: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "exercise_logs",
        modelName: "ExerciseLog",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        underscored: true,
      }
    );

    return ExerciseLog;
  }
}
