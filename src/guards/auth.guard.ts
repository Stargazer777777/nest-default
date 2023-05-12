import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class GuardGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {} // 注入Reflector
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Array<string | number>>(
      'role',
      context.getHandler(),
    ); // 读取meta中的role
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    if (true) {
      // access condition
      return true;
    }
    throw new HttpException('权限不足', 401);
  }
}
