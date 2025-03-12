import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { CategoryInterface } from '../interfaces/category.interface';

export interface CategoryCreationAttributes {
  id: string;
  name: string;
}

@Table({
  timestamps: false,
  tableName: "Categories"
})
export class Category extends Model<CategoryInterface, CategoryCreationAttributes> implements CategoryInterface {
    @Column({
        type: DataType.STRING,
        primaryKey: true
      })
      override id!: string
  
  @Column({
    type: DataType.STRING,
    unique: true
  })
  name!: string;
}
