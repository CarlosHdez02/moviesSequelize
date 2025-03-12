import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Movies } from '../models/movie.model';
import { Category } from '../models/category.model';

// Load environment variables
dotenv.config();

// Database configuration
const dbName = process.env.DB_NAME || 'lili_db';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'mypassword';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
const dialect = 'postgres';

console.log('Database connection details:', {
  database: dbName,
  username: dbUser,
  host: dbHost,
  port: dbPort,
  passwordProvided: dbPassword ? 'Yes' : 'No'
});

// Create Sequelize instance with properly typed options
const sequelizeOptions: SequelizeOptions = {
  database: dbName,
  username: dbUser,
  password: dbPassword,
  host: dbHost,
  port: dbPort,
  dialect: dialect,
  models: [Movies, Category],
  logging: process.env.NODE_ENV !== 'production' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: true,
  }
};

const sequelize = new Sequelize(sequelizeOptions);

// Function to initialize database connection
export const initDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync all models with database
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('Database synchronized.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export default sequelize;
