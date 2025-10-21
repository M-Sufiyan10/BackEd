// roles.guard.ts

import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!requiredRoles || requiredRoles.length === 0) return true;
  
      const req = context.switchToHttp().getRequest();
      const user = req.user;
  
      if (!user || !requiredRoles.includes(user.role)) {
        throw new ForbiddenException(`Access denied for role: ${user?.role}`);
      }
  
      return true;
    }
  }
  