import { Test, TestingModule } from '@nestjs/testing';
import { BurlaMaskController } from './burla-mask.controller';

describe('BurlaMaskController', () => {
  let controller: BurlaMaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BurlaMaskController],
    }).compile();

    controller = module.get<BurlaMaskController>(BurlaMaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
