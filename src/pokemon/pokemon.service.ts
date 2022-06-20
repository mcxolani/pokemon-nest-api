import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Pokemon } from './interfaces/pokemon.interface';

@Injectable()
export class PokemonService {
    constructor(private httpService: HttpService) { }

    findAll(): Observable<Pokemon[]> {
        return this.httpService.get('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0').pipe(
            map(response => {
                return response.data.results.map(p => {
                    const { name, url } = p;
                    return { name, image: this.getPokemonImageFromUrl(url) };
                })

            })
        );
    }

    getPokemonImageFromUrl(url: string): string {
        // we get id from url like "https://pokeapi.co/api/v2/pokemon/1/"
        const id = url.split("/")[6]
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    }

    getPokemonArtworkByID(id: number): string {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    }

    findOne(name: string): Observable<Pokemon> {
        return this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`).pipe(
            map(response => {
                const { name, stats, id } = response.data;
                return { name, stats, image: this.getPokemonArtworkByID(id) };
            })
        );
    }
}
