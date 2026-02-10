import {
  Table,
  Column,
  Model,
  DataType
} from "sequelize-typescript";

@Table({
  tableName: "user",
  timestamps: false
})
export default class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string;

   @Column({
    type: DataType.DATE,
    allowNull: true,
    field: "created_at"
  })
  createdAt!: Date | null;
}
