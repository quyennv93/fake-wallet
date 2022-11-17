import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustormerModule } from './modules/admin/custormer/custormer.module';
import { UserModule } from './modules/admin/user/user.module';
import { RoleService } from './modules/admin/role/role.service';
import { RoleController } from './modules/admin/role/role.controller';
import { RoleModule } from './modules/admin/role/role.module';
import { PermissionModule } from './modules/admin/permission/permission.module';
import { AuthModule } from './auth/admin/auth.module';

@Module({
  imports: [
    AuthModule,
    CustormerModule,
    UserModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController, RoleController],
  providers: [AppService, RoleService],
})
export class AppModule {}
