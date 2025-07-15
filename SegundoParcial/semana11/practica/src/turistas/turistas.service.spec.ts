import { Test, TestingModule } from '@nestjs/testing';
import { TuristasService } from './turistas.service';

describe('TuristasService', () => {
  let service: TuristasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TuristasService],
    }).compile();

    service = module.get<TuristasService>(TuristasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
