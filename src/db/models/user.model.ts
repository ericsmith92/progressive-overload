import { DataTypes, Model, type Optional, Sequelize } from "sequelize";

export type UserAttributes = {
  id: string;
  email: string | null;
  displayName: string | null;
};

export type UserCreationAttributes = Optional<
  UserAttributes,
  "id" | "email" | "displayName"
>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public email!: string | null;
  public displayName!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },

        email: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },

        displayName: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "display_name",
        },
      },
      {
        sequelize,
        tableName: "users",
        modelName: "User",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        underscored: true,
      }
    );

    return User;
  }
}
