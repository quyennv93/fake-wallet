import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { permission } from 'src/entities/permission.entity';
import { Role } from 'src/entities/role.entity';
import { PermissionRepository } from '../permission/permission.repository';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, PermissionRepository],
  imports: [TypeOrmModule.forFeature([Role, permission])],
})
export class RoleModule {}
