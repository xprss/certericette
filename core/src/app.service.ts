import { Injectable } from '@nestjs/common';
import { RecipeService } from './recipe/recipe.service';

@Injectable()
export class AppService {
  constructor(private readonly recipeService: RecipeService) {}
  getHello(): string {
    return this.recipeService.findAll();
  }
}
