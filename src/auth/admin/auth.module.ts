import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/modules/admin/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [
    UserModule,
    JwtModule.register({
      secret: '1993',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
