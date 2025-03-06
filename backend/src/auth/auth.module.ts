import { Secret, SignOptions } from './../../node_modules/@types/jsonwebtoken/index.d';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  imports:[PassportModule,
    JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory: async (configService:ConfigService)=>({
      secret:configService.get<string>('JWT_SECRET'),
      signOptions:{expiresIn:'60m'},
      }),

  }),
  UsersModule
],
})
export class AuthModule {}
