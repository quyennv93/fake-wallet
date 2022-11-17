import { Test, TestingModule } from '@nestjs/testing';
import { CustormerService } from './custormer.service';

describe('CustormerService', () => {
  let service: CustormerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustormerService],
    }).compile();

    service = module.get<CustormerService>(CustormerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
