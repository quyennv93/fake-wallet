import { PartialType } from '@nestjs/swagger';
import { CreateCustormerPersonalDto } from './create-custormer-personal.dto';

export class UpdateCustomerDto extends PartialType(
  CreateCustormerPersonalDto,
) {}
