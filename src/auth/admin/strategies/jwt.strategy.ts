import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { EntityType } from 'src/common/constrants';
import { AuthType } from 'src/enums/auth.enum';
import { AuthService } from '../auth.service';
import { UserAuthPayloadInterface } from '../interfaces/auth-payload.interface';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthType.ADMIN) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '1993',
    });
  }

  async validate(payload: any): Promise<any> {
    const { userId, entity }: UserAuthPayloadInterface = payload;
    let user = null;
    if (entity === EntityType.USER) {
      user = await this.authService.validateAdminUser(userId);
    }
    return user;
  }
}
