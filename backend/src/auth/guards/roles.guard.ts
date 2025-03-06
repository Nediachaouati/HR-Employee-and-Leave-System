import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/role.enum';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

canActivate(context: ExecutionContext): boolean {
  const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
  const request = context.switchToHttp().getRequest();
  const user = request.user;
  console.log('User from request:', user);
  console.log('Required roles:', requiredRoles);
  const hasRole = requiredRoles.some((role) => user?.role === role);
  console.log('Has required role:', hasRole);
  return hasRole;
}
}