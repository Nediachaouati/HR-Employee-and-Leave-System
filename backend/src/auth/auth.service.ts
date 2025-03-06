import { Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: { email: string; password: string }) {
    const user = await this.usersService.findOne(email, true);
    if (user && user.password && await bcrypt.compare(password, user.password)) {
        return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
    };
  }
}