import { Request, Response } from 'express';
import { MovieService } from '../service/movie.service';
import { CreateMovieDto, UpdateMovieDto } from '../dto/movie.dto';

export class MovieController {
  private movieService: MovieService;
  
  constructor() {
    this.movieService = new MovieService();
  }
  
  async create(req: Request, res: Response): Promise<void> {
    try {
      const createMovieDto: CreateMovieDto = req.body;
      const existingMovie = await this.movieService.findByName(createMovieDto.movieName)
      if (existingMovie) {
         res.status(409).json({ message: 'Category with this name already exists' });
         return;
      }
      
      const movie = await this.movieService.create(createMovieDto);
      res.status(201).json({ data: movie });

    } catch (error: any) {
      res.status(500).json({ message: 'Failed to create movie', error: error.message });
    }
  }
  
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      // Extract query parameters
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const title = req.query.title as string;
      const category = req.query.category as string;
      
      // Get paginated and filtered results
      const { rows: movies, count } = await this.movieService.findAll(page, limit, title, category);
      
      // Calculate pagination metadata
      const totalPages = Math.ceil(count / limit);
      const hasNext = page < totalPages;
      const hasPrevious = page > 1;
      
      res.status(200).json({
        data: movies,
        metadata: {
          total: count,
          page,
          limit,
          totalPages,
          hasNext,
          hasPrevious
        }
      });
    } catch (error: any) {
      res.status(500).json({ message: 'Failed to retrieve movies', error: error.message });
    }
  }
  
  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const movie = await this.movieService.findOne(id);
      
      if (!movie) {
        res.status(404).json({ message: 'Movie not found' });
        return;
      }
      
      res.status(200).json({ data: movie });
    } catch (error: any) {
      res.status(500).json({ message: 'Failed to retrieve movie', error: error.message });
    }
  }
  
  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const updateMovieDto: UpdateMovieDto = req.body;
      const [affectedCount, updatedMovies] = await this.movieService.update(id, updateMovieDto);
      
      if (affectedCount === 0) {
        res.status(404).json({ message: 'Movie not found' });
        return;
      }
      
      res.status(200).json({ data: updatedMovies[0] });
    } catch (error: any) {
      res.status(500).json({ message: 'Failed to update movie', error: error.message });
    }
  }
  
  async remove(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const deletedCount = await this.movieService.remove(id);
      
      if (deletedCount === 0) {
        res.status(404).json({ message: 'Movie not found' });
        return;
      }
      
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: 'Failed to delete movie', error: error.message });
    }
  }
}