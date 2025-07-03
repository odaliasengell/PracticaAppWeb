import { Test, TestingModule } from '@nestjs/testing';
import { ProductoResolver } from './producto.resolver';
import { ProductoService } from './producto.service';

describe('ProductoResolver', () => {
  let resolver: ProductoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductoResolver, ProductoService],
    }).compile();

    resolver = module.get<ProductoResolver>(ProductoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
