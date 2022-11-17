import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthType } from 'src/enums/auth.enum';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthType.ADMIN) {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext): any {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
