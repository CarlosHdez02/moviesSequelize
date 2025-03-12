import express, { Router } from 'express';
import { validateRequest } from '../middleware/validate_request';
import { createCategorySchema, updateCategorySchema } from '../validators/category.validator';
import { CategoryController } from '../controller/category.controller';

export class CategoryRoutes {
  private router: Router;
  private categoryController: CategoryController;

  constructor() {
    this.router = express.Router();
    this.categoryController = new CategoryController();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Create a new category with validation
    this.router.post(
      '/',
      validateRequest(createCategorySchema),
      (req, res) => {
        this.categoryController.create(req, res);
      }
    );
  
    // Get all categories
    this.router.get('/', (req, res) => {
      this.categoryController.findAll(req, res);
    });
  
    // Get paginated categories - MOVED BEFORE /:id route
    this.router.get('/paginated', (req, res) => {
      this.categoryController.findAllPaginated(req, res);
    });
  
    // Get a specific category by ID
    this.router.get('/:id', (req, res) => {
      this.categoryController.findOne(req, res);
    });
  
    // Update a category with validation
    this.router.put(
      '/:id',
      validateRequest(updateCategorySchema),
      (req, res) => {
        this.categoryController.update(req, res);
      }
    );
  
    // Delete a category
    this.router.delete('/:id', (req, res) => {
      this.categoryController.remove(req, res);
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}

const categoryRoutes = new CategoryRoutes();
export default categoryRoutes.getRouter();