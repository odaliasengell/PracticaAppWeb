import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';

@Resolver(() => Usuario)
export class UsuarioResolver {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Mutation(() => Usuario)
  createUsuario(@Args('createUsuarioInput') input: CreateUsuarioInput) {
    return this.usuarioService.create(input);
  }

  @Query(() => [Usuario], { name: 'usuarios' })
  findAll() {
    return this.usuarioService.findAll();
  }

  @Query(() => Usuario, { name: 'usuario' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usuarioService.findOne(id);
  }

  @Mutation(() => Usuario)
  updateUsuario(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput,
  ) {
    return this.usuarioService.update(id, updateUsuarioInput);
  }

  @Mutation(() => Boolean)
  removeUsuario(@Args('id', { type: () => Int }) id: number) {
    return this.usuarioService.remove(id);
  }
}
