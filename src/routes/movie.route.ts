import express, { Router } from 'express';
import { MovieController } from '../controller/movie.controller';
import { validateRequest } from '../middleware/validate_request';
import { createMovieSchema, updateMovieSchema } from '../validators/movie.validator';

export class MovieRoutes {
  private router: Router;
  private movieController: MovieController;

  constructor() {
    this.router = express.Router();
    this.movieController = new MovieController();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Create a new movie (POST /api/movies)
    this.router.post('/', 
      validateRequest(createMovieSchema),
      async (req, res) => {
        await this.movieController.create(req, res);
      }
    );

    // Get paginated and filtered movies (GET /api/movies?page=1&limit=10&title=example&category=action)
    this.router.get('/', async (req, res) => {
      await this.movieController.findAll(req, res);
    });

    // Get a specific movie by ID (GET /api/movies/:id)
    this.router.get('/:id', async (req, res) => {
      await this.movieController.findOne(req, res);
    });

    // Update a movie (PUT /api/movies/:id)
    this.router.put('/:id', 
      validateRequest(updateMovieSchema),
      async (req, res) => {
        await this.movieController.update(req, res);
      }
    );

    // Delete a movie (DELETE /api/movies/:id)
    this.router.delete('/:id', async (req, res) => {
      await this.movieController.remove(req, res);
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}

const movieRoutes = new MovieRoutes();
export default movieRoutes.getRouter();