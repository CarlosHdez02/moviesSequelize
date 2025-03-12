import { MovieGenre } from '../interfaces/movie.interface';

export class CreateMovieDto {
  id?: string;
  movieName!: string;
  description!: string;
  genre!: MovieGenre;
  category!: string[]; 
}

export class UpdateMovieDto {
  movieName?: string;
  description?: string;
  genre?: MovieGenre;
  category?: string[];
}