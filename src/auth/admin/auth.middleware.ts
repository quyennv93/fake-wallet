import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);
  constructor(private readonly authService: AuthService) {}
  async use(req: any, res: any, next: () => void): Promise<void> {
    const { ip, method, originalUrl } = req;
    const token: string = req.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      await this.authService.verifyToken(token);
      next();
    } catch (err) {
      this.logger.log(
        `Request ${method} - ${originalUrl} - ${ip} invalid credentials`,
      );
      throw new UnauthorizedException();
    }
  }
}
