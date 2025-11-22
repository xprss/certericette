import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './entities/recipe.entity';
import { Model } from 'mongoose';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name) private readonly recipeModel: Model<Recipe>,
  ) {}

  create(createRecipeDto: CreateRecipeDto) {
    return this.recipeModel.insertOne(createRecipeDto);
  }

  findAll() {
    return `This action returns all recipe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
