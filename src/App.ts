import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import movieRoute from './routes/movie.route';
import categoryRoute from './routes/category.route';
import { initDatabase } from './database/database';
//import dotenv from 'dotenv';

//dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//  database

initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });



// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/movies', movieRoute);
app.use('/api/categories', categoryRoute);


// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});



export default app;