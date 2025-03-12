import { MovieGenre } from '../interfaces/movie.interface';

export class CreateMovieDto {
  id?: string;
  movieName!: string;
  description!: string;
  genre!: MovieGenre;
  category!: string[]; // List of category names or IDs
}

export class UpdateMovieDto {
  movieName?: string;
  description?: string;
  genre?: MovieGenre;
  category?: string[];
}