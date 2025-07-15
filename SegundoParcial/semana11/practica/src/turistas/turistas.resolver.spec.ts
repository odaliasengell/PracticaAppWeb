import { Test, TestingModule } from '@nestjs/testing';
import { TuristasResolver } from './turistas.resolver';
import { TuristasService } from './turistas.service';

describe('TuristasResolver', () => {
  let resolver: TuristasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TuristasResolver, TuristasService],
    }).compile();

    resolver = module.get<TuristasResolver>(TuristasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
