import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioResolver } from './usuario.resolver';
import { UsuarioService } from './usuario.service';

describe('UsuarioResolver', () => {
  let resolver: UsuarioResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioResolver, UsuarioService],
    }).compile();

    resolver = module.get<UsuarioResolver>(UsuarioResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
