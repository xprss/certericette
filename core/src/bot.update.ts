import { Update, Start, Help, On, Ctx, Command } from 'nestjs-telegraf';
import * as telegraf from 'telegraf';
import type { Context, NarrowedContext } from 'telegraf';
import type { Message, Update as TgUpdate } from 'telegraf/types';
import { RecipeService } from './recipe/recipe.service';
import { Logger } from '@nestjs/common';

@Update()
export class BotUpdate {
  private readonly logger = new Logger(BotUpdate.name);

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

  @Command('get_all_recipes')
  async onGetAllRecipes(@Ctx() ctx: telegraf.Context) {
    this.logger.debug('Fetching all recipes from the database');
    const recipes = await this.recipeService.findAll();
    await ctx.reply(
      `<b>Le tue ricette salvate</b>
${recipes.length === 0 ? 'Nessuna ricetta trovata.' : recipes.map((r) => `<i>${r.idea}</i>`).join('\n')}`,
      { parse_mode: 'HTML' },
    );
  }

  @On('text')
  async onText(
    @Ctx()
    ctx: NarrowedContext<Context, TgUpdate.MessageUpdate<Message.TextMessage>>,
  ) {
    // Ignora i comandi (es: /start, /get-all-recipes)
    if (ctx.message?.entities?.some((e) => e.type === 'bot_command')) {
      return;
    }

    this.logger.debug('Receiving new text message from user');
    const message = ctx.message.text;

    await this.recipeService.create({ idea: message });
    await ctx.reply(`Ho memorizzato: "${message}"`);
  }
}
