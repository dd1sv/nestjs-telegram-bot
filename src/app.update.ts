import { Controller, Get } from '@nestjs/common';
import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context ,Telegraf } from 'telegraf';
import { actionButton } from './app.buttons';
import { AppService } from './app.service';

@Update()
export class AppUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context> , private readonly appService: AppService) {}

  @Start()
  async startCommand(cxt: Context) {
    await cxt.reply('Hi, Friend'),
    await cxt.reply('Choose Action', actionButton())
  }



}