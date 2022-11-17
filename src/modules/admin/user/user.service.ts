import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/admin/auth.service';
import { RoleRepository } from '../role/role.repository';
import { UserRepository } from './user.repository';
import { Role as RoleEnum } from '../../../enums/role.enum';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';
import { PageDto } from 'src/common/pagination/page.dto';
import { UserDetailDto } from './dto/user-detail.dto';
import { PageOptionsDto } from 'src/common/pagination/page-options.dto';
import {
  DeleteResult,
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  UpdateResult,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserLoginResponse } from './dto/user-login-response.dto';
import * as bcrypt from 'bcrypt';
import { UserAuthPayloadInterface } from 'src/auth/admin/interfaces/auth-payload.interface';
import { EntityType } from 'src/common/constrants';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async onModuleInit(): Promise<any> {
    try {
      let role = await this.roleRepository.findOneBy({ name: RoleEnum.ADMIN });
      if (!role) {
        role = new Role();
        role.name = RoleEnum.ADMIN;
        role.displayName = RoleEnum.ADMIN;
        role = await this.roleRepository.save(role);
      }
      let user = await this.userRepository.findOneBy({
        email: 'admin@gmail.com',
      });
      if (!user) {
        user = new User();
        user.email = 'admin@gmail.com';
        user.password = '123456';
        user.fullName = 'Admin';
      }
      user.roleId = role.id;
      await this.userRepository.save(user);
    } catch (err) {
      console.log('onModuleInit err: ', err);
    }
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UserDetailDto>> {
    const whereCondition: FindOptionsWhere<User> = {};
    if (pageOptionsDto.query) {
      whereCondition.email = ILike(`%${pageOptionsDto.query}%`);
    }
    const orderOption: FindOptionsOrder<User> = {};
    if (pageOptionsDto.orderBy) {
      orderOption[pageOptionsDto.orderBy] = pageOptionsDto.order;
    }
    return await this.userRepository.pagination(
      pageOptionsDto,
      whereCondition,
      orderOption,
      UserDetailDto,
    );
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = plainToInstance(User, createUserDto);
    return await this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<UserLoginResponse> {
    const user: User = await this.userRepository.findActiveByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      throw new UnauthorizedException();
    }

    const jwtPayload: UserAuthPayloadInterface = {
      authType: 'admin',
      userId: user.id,
      entity: EntityType.USER,
    };

    const result: UserLoginResponse = {
      accessToken: this.authService.generateAdminUserToken(jwtPayload),
      tokenType: 'Bearer',
      id: user.id,
    };
    return result;
  }

  async changePassword(
    userId: number,
    { password, newPassword }: ChangePasswordDto,
  ): Promise<void> {
    const user: User = await this.userRepository.findActiveById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      throw new UnauthorizedException();
    }
    user.password = newPassword;
    await this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    if (updateUserDto.password) {
      const user = new User();
      updateUserDto.password = user.setPassword(updateUserDto.password);
    }
    return this.userRepository.update({ id }, updateUserDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete({ id });
  }

  async setRoleForUser(roleId: number, userId: number): Promise<User> {
    const role = await this.roleRepository.findOneBy({ id: roleId });
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!role) {
      throw new NotFoundException('role not found');
    }
    if (!user) {
      throw new NotFoundException('user not found');
    }
    user.role = role;
    return this.userRepository.save(user);
  }
}
