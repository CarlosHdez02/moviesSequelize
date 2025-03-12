import { v4 as uuidv4 } from 'uuid';
import { Category, CategoryCreationAttributes } from '../models/category.model';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { Movies } from '../models/movie.model';
import { Op } from 'sequelize';

export class CategoryService {
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const categoryData: CategoryCreationAttributes = {
      id: createCategoryDto.id || uuidv4(),
      name: createCategoryDto.name,
    };
    
    return Category.create(categoryData);
  }
  
  async findAll(): Promise<Category[]> {
    return Category.findAll();
  }
  
  async findOne(id: string): Promise<Category | null> {
    return Category.findByPk(id);
  }

  async findByName(name: string, caseSensitive: boolean = true): Promise<Category | null> {
    if (caseSensitive) {
      return Category.findOne({
        where: { name }
      });
    } else {
      return Category.findOne({
        where: {
          name: {
            [Op.iLike]: name
          }
        }
      });
    }
  }
  async findAllPaginated(page: number, limit: number): Promise<{ categories: Category[], total: number }> {
    const offset = (page - 1) * limit;
    
    const { count, rows } = await Category.findAndCountAll({
      limit,
      offset,
      order: [['name', 'ASC']]
    });
    
    return {
      categories: rows,
      total: count
    };
  }
  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<[number, Category[]]> {
    return Category.update(updateCategoryDto, {
      where: { id },
      returning: true
    });
  }
  
  async remove(id: string): Promise<number> {
    // First check if any movies are linked to this category
    const linkedMovies = await Movies.findOne({
      where: {
        category: {
          [Op.contains]: [id] // This works if category is an array of category IDs
        }
      }
    });
    
    // If movies are linked to this category, throw an error
    if (linkedMovies) {
      throw new Error('Cannot delete category: There are movies linked to this category');
    }
    
    // If no movies are linked, proceed with deletion
    return Category.destroy({
      where: { id }
    });
  }
}