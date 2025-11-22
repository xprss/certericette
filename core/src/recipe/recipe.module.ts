import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './entities/recipe.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
  providers: [RecipeService],
  exports: [RecipeService],
})
export class RecipeModule {}
