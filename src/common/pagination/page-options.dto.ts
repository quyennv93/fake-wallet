import { ApiPropertyOptional } from '@nestjs/swagger';
import { Order } from '../constrants';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
export class PageOptionsDto {
  @ApiPropertyOptional({
    enum: Order,
    default: Order.DESC,
  })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.DESC;

  @IsOptional()
  readonly orderBy?: string = 'createdAt';

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  @Type(() => String)
  @IsOptional()
  readonly query?: string;
}
