import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Movies } from '../models/movie.model';
import { CreateMovieDto, UpdateMovieDto } from '../dto/movie.dto';
import { MovieGenre } from '../interfaces/movie.interface';

export class MovieService {
  async create(createMovieDto: CreateMovieDto): Promise<Partial<Movies>> {
    const movie = await Movies.create({
      id: createMovieDto.id || uuidv4(),
      movieName: createMovieDto.movieName,
      description: createMovieDto.description,
      genre: createMovieDto.genre as MovieGenre,
      category: createMovieDto.category,
    });

    return movie.toJSON();
  }

  async findAll(
    page: number = 1,
    limit: number = 5,
    title?: string,
    category?: string
  ): Promise<{ rows: Movies[]; count: number }> {
    const offset = (page - 1) * limit;

    const whereConditions: Record<string, any> = {};

    if (title) {
      whereConditions.movieName = { [Op.iLike]: `%${title}%` };
    }

    if (category) {
      whereConditions.category = { [Op.contains]: [category] };
    }

    const { rows, count } = await Movies.findAndCountAll({
      where: whereConditions,
      limit,
      offset,
      order: [['movieName', 'ASC']],
    });

    return { rows, count };
  }

  async findOne(id: string): Promise<Movies | null> {
    return Movies.findByPk(id);
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto
  ): Promise<[number, Movies[]]> {
    return Movies.update(updateMovieDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: string): Promise<number> {
    return Movies.destroy({
      where: { id },
    });
  }

  async findByName(movieName: string, caseSensitive: boolean = true): Promise<Movies | null> {
    if (caseSensitive) {
      return Movies.findOne({
        where: { movieName }
      });
    } else {
      return Movies.findOne({
        where: {
          movieName: {
            [Op.iLike]: movieName
          }
        }
      });
    }
  }
}