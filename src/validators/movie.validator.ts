
import Joi from 'joi';
import { MovieGenre } from '../interfaces/movie.interface';


const genreValues = ['Action', 'Comedy', 'Horror', 'Thriller', 'Romance'];

export const createMovieSchema = Joi.object({
  id: Joi.string().uuid(),
  movieName: Joi.string().min(1).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  genre: Joi.string().valid(...genreValues).required(),
  category: Joi.array().items(Joi.string()).min(1).required()
});

export const updateMovieSchema = Joi.object({
  movieName: Joi.string().min(1).max(100),
  description: Joi.string().min(10).max(1000),
  genre: Joi.string().valid(...genreValues),
  category: Joi.array().items(Joi.string()).min(1)
}).min(1); 