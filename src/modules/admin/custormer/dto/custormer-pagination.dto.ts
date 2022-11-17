import { PageOptionsDto } from 'src/common/pagination/page-options.dto';
import { PageDto } from 'src/common/pagination/page.dto';
import { Customer } from 'src/entities/custormer.entity';

export class CustomerPageDto extends PageDto<Customer> {}

export class CustomerPageOptionsDto extends PageOptionsDto {}
