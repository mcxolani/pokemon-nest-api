import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Get()
    getAllPokemon() {
        return this.pokemonService.findAll();
    }

    @Get(':name')
    getPokemon(@Param('name') name: string) {
        return this.pokemonService.findOne(name);
    }
}
