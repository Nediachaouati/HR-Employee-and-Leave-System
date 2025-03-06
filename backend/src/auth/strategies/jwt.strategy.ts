import { Injectable,UnauthorizedException } from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt,Strategy} from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
      private configService: ConfigService,
      private usersService: UsersService,
    ) {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error("JWT_SECRET n'est pas défini dans les variables d'environnement");
        }
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: secret,
        });
      }

      async validate(payload: any) {
        const user = await this.usersService.findOne(payload.email);
        if (!user) {
          throw new UnauthorizedException();
        }
        return user; 
      }
}