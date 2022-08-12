import { Controller, Get } from '@nestjs/common';
import { Action, Ctx, Hears, InjectBot, Message, On, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { actionButton } from './app.buttons';
import { AppService } from './app.service';
import { showList } from './app.utlis';
import { Context } from './context.interface';

const todos = [{
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

  @Action('list')
  async listAll(ctx: Context) {
    await ctx.reply(showList(todos))
  }

  @Action('done')
  async doneTask(ctx: Context) {
    await ctx.reply('Write task id: ')
    ctx.session.type = 'done'
  } 

  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    if (!ctx.session.type) return
    if (ctx.session.type === 'done') {
        const todo = todos.find( t => t.id === Number(message) )
        if(!todo) {
            ctx.deleteMessage()
            ctx.reply('No id found')
            return
        }
        showList(todos)
    }
  }



}