import { Test, TestingModule } from '@nestjs/testing';
import { CustormerController } from './custormer.controller';

describe('CustormerController', () => {
  let controller: CustormerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustormerController],
    }).compile();

    controller = module.get<CustormerController>(CustormerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
