import { PageOptionsDto } from 'src/common/pagination/page-options.dto';
import { PageDto } from 'src/common/pagination/page.dto';
import { Role } from 'src/entities/role.entity';

export class RolePageDto extends PageDto<Role> {}

export class RolePageOptionsDto extends PageOptionsDto {}
