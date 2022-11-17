import { Module } from '@nestjs/common';
import { CustormerController } from './custormer.controller';
import { CustormerService } from './custormer.service';

@Module({
  controllers: [CustormerController],
  providers: [CustormerService],
})
export class CustormerModule {}
