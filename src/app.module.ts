import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as LocalSession from 'telegraf-session-local';
import { AppUpdate } from './app.update';


const sessions = new LocalSession({database: 'session_db.json'})

@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: "5464902712:AAHufBI6KVrC4sWPwzRDPnIJ4GixCg5AMUQ"
    })
  ],
  // controllers: [AppController],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
