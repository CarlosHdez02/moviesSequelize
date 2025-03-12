import { Request, Response } from 'express';
import { CategoryService } from '../service/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';

const categoryService = new CategoryService();

export class CategoryController {
  // Create a new category
  async create(req: Request, res: Response): Promise<void> {
    try {
      const createCategoryDto: CreateCategoryDto = req.body;
      
      const existingCategory = await categoryService.findByName(createCategoryDto.name);
      if (existingCategory) {
        res.status(409).json({ message: 'Category with this name already exists' });
        return;
      }
      
      const category = await categoryService.create(createCategoryDto);
      res.status(201).json(category);
    } catch (error:any) {
      res.status(500).json({ message: 'Failed to create category', error: error.message });
    }
  }

  // Get all categories
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const categories = await categoryService.findAll();
      res.status(200).json(categories);
    } catch (error:any) {
      res.status(500).json({ message: 'Failed to retrieve categories', error: error.message });
    }
  }

  // Get a specific category by ID
  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const category = await categoryService.findOne(id);
      
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      
      res.status(200).json(category);
    } catch (error:any) {
      res.status(500).json({ message: 'Failed to retrieve category', error: error.message });
    }
  }

  async findAllPaginated(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const { categories, total } = await categoryService.findAllPaginated(page, limit);
      
      res.status(200).json({
        data: categories,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      });
    } catch (error: any) {
      res.status(500).json({ message: 'Failed to retrieve categories', error: error.message });
    }
  }

  // Update a category
  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const updateCategoryDto: UpdateCategoryDto = req.body;
      
      // Check if updating to a name that already exists
      if (updateCategoryDto.name) {
        const existingCategory = await categoryService.findByName(updateCategoryDto.name);
        if (existingCategory && existingCategory.id !== id) {
          res.status(409).json({ message: 'Category with this name already exists' });
          return;
        }
      }
      
      const [affectedCount, updatedCategories] = await categoryService.update(id, updateCategoryDto);
      
      if (affectedCount === 0) {
        res.status(404).json({ message: 'Category not found or no changes made' });
        return;
      }
      
      res.status(200).json(updatedCategories[0]);
    } catch (error:any) {
      res.status(500).json({ message: 'Failed to update category', error: error.message });
    }
  }

  // Delete a category
  async remove(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      
      try {
        const deletedCount = await categoryService.remove(id);
        
        if (deletedCount === 0) {
          res.status(404).json({ message: 'Category not found' });
          return;
        }
        
        res.status(204).send();
      } catch (error:any) {
        if (error.message.includes('associated movies')) {
          res.status(400).json({ message: 'Cannot delete category because it has associated movies' });
        } else {
          throw error;
        }
      }
    } catch (error:any) {
      res.status(500).json({ message: 'Failed to delete category', error: error.message });
    }
  }
}