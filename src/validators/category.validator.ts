import Joi from 'joi';

export const createCategorySchema = Joi.object({
  id: Joi.string().uuid(),
  name: Joi.string().min(1).max(50).required(),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(1).max(50),
}).min(1); 