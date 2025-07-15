import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PedidoService } from './pedido.service';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoInput } from './dto/create-pedido.input';
import { UpdatePedidoInput } from './dto/update-pedido.input';

@Resolver(() => Pedido)
export class PedidoResolver {
  constructor(private readonly pedidoService: PedidoService) {}

  @Mutation(() => Pedido)
  createPedido(@Args('createPedidoInput') input: CreatePedidoInput) {
    return this.pedidoService.create(input);
  }

  @Query(() => [Pedido], { name: 'pedidos' })
  findAll() {
    return this.pedidoService.findAll();
  }

  @Query(() => Pedido, { name: 'pedido' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.pedidoService.findOne(id);
  }

  @Mutation(() => Pedido)
  updatePedido(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePedidoInput') input: UpdatePedidoInput,
  ) {
    return this.pedidoService.update(id, input);
  }

  @Mutation(() => Boolean)
  removePedido(@Args('id', { type: () => Int }) id: number) {
    return this.pedidoService.remove(id);
  }
}
