import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/admin/guards/jwt-auth.guard';

@Controller({ path: 'admin/user' })
@ApiBearerAuth('access-token')
@ApiTags('Admin User')
@UseGuards(JwtAuthGuard)
export class UserController {}
