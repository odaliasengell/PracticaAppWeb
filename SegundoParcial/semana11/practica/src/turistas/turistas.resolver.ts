import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TuristasService } from './turistas.service';
import { Turista } from './entities/turista.entity';
import { CreateTuristaInput } from './dto/create-turista.input';
import { UpdateTuristaInput } from './dto/update-turista.input';

@Resolver(() => Turista)
export class TuristasResolver {
  constructor(private readonly turistasService: TuristasService) {}

  @Mutation(() => Turista)
  createTurista(@Args('createTuristaInput') createTuristaInput: CreateTuristaInput) {
    return this.turistasService.create(createTuristaInput);
  }

  @Query(() => [Turista], { name: 'turistas' })
  findAll() {
    return this.turistasService.findAll();
  }

  @Query(() => Turista, { name: 'turista' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.turistasService.findOne(String(id));
  }

  @Mutation(() => Turista)
  updateTurista(@Args('updateTuristaInput') updateTuristaInput: UpdateTuristaInput) {
    return this.turistasService.update(updateTuristaInput.id, updateTuristaInput);
  }

  @Mutation(() => Turista)
  removeTurista(@Args('id', { type: () => String }) id: string) {
    return this.turistasService.remove(String(id));
  }
}