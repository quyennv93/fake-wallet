import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/admin/guards/jwt-auth.guard';
import { PageDto } from 'src/common/pagination/page.dto';
import { Role } from 'src/entities/role.entity';
import { UpdateResult } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleDetailDto } from './dto/role-detail.dto';
import { RolePageOptionsDto } from './dto/role-pagination.dto';
import { SetPermissionForRoleDto } from './dto/set-permission-for-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';

@Controller({ path: 'admin/role' })
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Admin Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll(
    @Query() queryDto: RolePageOptionsDto,
  ): Promise<PageDto<RoleDetailDto>> {
    return this.roleService.findAll(queryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Role> {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<UpdateResult> {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Role> {
    return this.roleService.remove(+id);
  }

  @Post('permission')
  setPermissionForRole(
    @Body() setPermissionForRole: SetPermissionForRoleDto,
  ): Promise<Role> {
    return this.roleService.setPermissionForRole(
      setPermissionForRole.roleId,
      setPermissionForRole.permissonIds,
    );
  }
}
