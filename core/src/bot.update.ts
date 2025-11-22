import { Update, Start, Help, On, Ctx } from 'nestjs-telegraf';
import * as telegraf from 'telegraf';
import type { Context, NarrowedContext } from 'telegraf';
import type { Message, Update as TgUpdate } from 'telegraf/types';
import { RecipeService } from './recipe/recipe.service';

@Update()
export class BotUpdate {
  constructor(private readonly recipeService: RecipeService) {}
  @Start()
  async onStart(@Ctx() ctx: telegraf.Context) {
    await ctx.replyWithPoll('Qual è il tuo piatto preferito?', [
      'Pizza',
      'Pasta',
      'Insalata',
    ]);
  }

  @Help()
  async onHelp(@Ctx() ctx: telegraf.Context) {
    await ctx.reply('Ecco la lista dei comandi disponibili...');
  }

  @On('text')
  async onText(
    @Ctx()
    ctx: NarrowedContext<Context, TgUpdate.MessageUpdate<Message.TextMessage>>,
  ) {
    const message = ctx.message?.text;
    await this.recipeService.create({ idea: message });
    await ctx.reply(`Ho memorizzato: "${message}"`);
  }
}
