import { Injectable } from '@nestjs/common';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';
import { UserRepository } from 'src/modules/admin/user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { UserDetailDto } from 'src/modules/admin/user/dto/user-detail.dto';
import { plainToInstance } from 'class-transformer';
import { UserAuthPayloadInterface } from './interfaces/auth-payload.interface';
import { EntityType } from 'src/common/constrants';
@Injectable()
export class AuthService {
  private readonly jwtOption: JwtSignOptions = {};

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {
    this.jwtOption = {
      secret: '1993',
      expiresIn: '1d',
    };
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token, {
      ...this.jwtOption,
    });
  }

  async validateAdminUser(id: number): Promise<UserDetailDto> {
    const user = await this.userRepository.findActiveById(id);
    return plainToInstance(UserDetailDto, user);
  }

  generateAdminUserToken(payload: UserAuthPayloadInterface): string {
    return this.jwtService.sign(
      {
        ...payload,
        authType: 'admin',
        entity: EntityType.USER,
      },
      this.jwtOption,
    );
  }
}
