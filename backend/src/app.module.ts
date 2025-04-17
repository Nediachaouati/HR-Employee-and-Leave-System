import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { typeormConfig } from './config/typeorm.config';
import { DemandCongeModule } from './demand-conge/demand-conge.module';
import { PerformanceEvaluationModule } from './performance-evaluation/performance-evaluation.module';
import { TimesheetModule } from './timesheet/timesheet.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
     TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory:typeormConfig, }),
    
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, 
        auth: {
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASSWORD, 
        },
      },
      defaults: {
        from: '"emailverif" <nediachaouati39@gmail.com>',
      },
      template: {
        dir: join(__dirname, 'templates'), 
        adapter: new HandlebarsAdapter(), 
        options: {
          strict: true,
        },
      },
    }),
    
   
     AuthModule, UsersModule, DemandCongeModule, PerformanceEvaluationModule, TimesheetModule],
  controllers: [AppController],
  providers: [
    AppService,{
      provide: APP_GUARD,
      useClass:JwtAuthGuard,
    },
  ],
})
export class AppModule {}
