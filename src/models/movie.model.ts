import {
    Column,
    DataType,
    Model,
    Table,
  } from 'sequelize-typescript';
  import { MovieGenre } from '../interfaces/movie.interface';
  
  @Table({
    timestamps: false,
    tableName: 'Movies',
  })
  export class Movies extends Model {
    @Column({
      type: DataType.STRING,
      primaryKey: true,
      // Add an initializer or use declare to fix the error
      defaultValue: DataType.UUIDV4, // Using UUID as default value
    })
    declare id: string; // Using 'declare' keyword to avoid conflict with base Model
  
    @Column({
      type: DataType.STRING,
    })
    movieName!: string;
  
    @Column({
      type: DataType.TEXT,
    })
    description!: string;
  
    @Column({
      type: DataType.ENUM('Action', 'Comedy', 'Horror', 'Thriller', 'Romance'),
    })
    genre!: MovieGenre;
  
    @Column({
      type: DataType.ARRAY(DataType.STRING),
    })
    category!: string[];
  }