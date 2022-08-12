import { Controller, Get } from '@nestjs/common';
import { Action, Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context ,Telegraf } from 'telegraf';
import { actionButton } from './app.buttons';
import { AppService } from './app.service';

const todo = [{
    id: 1,
    name: "Buy home",
    isCompleted: false
},{
    id: 2,
    name: "Buy car",
    isCompleted: true
},{
    id: 3,
    name: "Write app",
    isCompleted: false
}]

@Update()
export class AppUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context> , private readonly appService: AppService) {}

  @Start()
  async startCommand(cxt: Context) {
    await cxt.reply('Hi, Friend'),
    await cxt.reply('Choose Action', actionButton())
  }

  @Hears('list')
  async listAll(ctx: Context) {
    await ctx.reply(`${
        todo.map(todo => 
            todo.isCompleted ? "OK" + ' ' + todo.name + '\n' : "Planned" + ' ' + todo.name + '\n').
            join('')
    }`)
  }

  @Hears('done')
  async doneTask(ctx: Context) {} 



}