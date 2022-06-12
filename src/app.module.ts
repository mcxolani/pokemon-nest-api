import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [HttpModule, PokemonModule]
})
export class AppModule { }
