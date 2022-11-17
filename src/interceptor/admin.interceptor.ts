import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { IResponse } from 'src/interface/common.interface';
import { isRabbitContext } from '@golevelup/nestjs-rabbitmq';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { instanceToPlain } from 'class-transformer';
@Injectable()
export class AdminInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    if (isRabbitContext(context)) {
      return next.handle();
    }
    const request = context.switchToHttp().getRequest();
    if (request.user) {
      const requestDeviceId: string = request.headers['deviceid']?.trim();
      if (!requestDeviceId) {
        throw new BadRequestException();
      }
      const currentDeviceId: string = request.user?.device?.deviceId?.trim();
      if (requestDeviceId !== currentDeviceId) {
        throw new UnauthorizedException();
      }
    }
    return next.handle().pipe(
      map((data) => {
        return {
          data: typeof data === 'string' ? data : instanceToPlain<T>(data, {}),
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data?.message || '',
        };
      }),
    );
  }
}
