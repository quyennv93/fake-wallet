import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PageOptionsDto } from 'src/common/pagination/page-options.dto';
import { PageDto } from 'src/common/pagination/page.dto';
import { Role } from 'src/entities/role.entity';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  In,
  UpdateResult,
} from 'typeorm';
import { PermissionRepository } from '../permission/permission.repository';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleDetailDto } from './dto/role-detail.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async create(creatRoleDto: CreateRoleDto) {
    const role: Role = plainToInstance(Role, creatRoleDto);
    return await this.roleRepository.save(role);
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<RoleDetailDto>> {
    const whereCondition: FindOptionsWhere<Role> = {};
    if (pageOptionsDto.query) {
      whereCondition.name = ILike(`%${pageOptionsDto.query}%`);
    }
    const orderOption: FindOptionsOrder<Role> = {};
    if (pageOptionsDto.orderBy) {
      orderOption[pageOptionsDto.orderBy] = pageOptionsDto.order;
    }
    return this.roleRepository.pagination(
      pageOptionsDto,
      whereCondition,
      orderOption,
      RoleDetailDto,
    );
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ id });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async update(
    id: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<UpdateResult> {
    return this.roleRepository.update({ id }, updateRoleDto);
  }

  async remove(id: number): Promise<Role> {
    return this.roleRepository.softRemove({ id });
  }

  async setPermissionForRole(
    roleId: number,
    permissionIds: number[],
  ): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ id: roleId });
    const permissions = await this.permissionRepository.findBy({
      id: In(permissionIds),
    });
    role.permisstions = permissions;
    return this.roleRepository.save(role);
  }
}
