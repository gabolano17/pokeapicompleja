import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FetchPokemonsResp, OtherDetails, Pokemon } from '../interfaces/pokemon';

const API_ROUTES = {
  getPokemons: (limit: number) => `/pokemon/?limit=${limit}`
}

const getSprite = (id: number|string) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private url: string = environment.url;

  constructor(private http: HttpClient) {}

  getAllPokemons(limit: number = 1500): Observable<Pokemon[]> {
    return this.http
      .get<FetchPokemonsResp>(`${this.url}${API_ROUTES.getPokemons(limit)}`)
      .pipe(
        map((pokemon) => {
          const pokeList: Pokemon[] = pokemon.results.map((poke) => {
            const id = poke.url.split('/')[6];
            return {
              id,
              sprite: getSprite(id),
              name: poke.name,
              url: poke.url,
              // height,
              // types,
              // weight
            };
          });

          return pokeList;
        })
      );
  }

  // private transformPokemon(res: FetchPokemonsResp):Pokemon[]{

  //   const pokeList:Pokemon[] = res.results.map(poke => {

  //     const urlArr = poke.url.split('/');
  //     const id = urlArr[6];
  //     const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  //     return {
  //       id,
  //       sprite,
  //       name: poke.name,
  //       // height,
  //       // types,
  //       // weight
  //     }

  //   })

  //   return pokeList;

  // }

  getOtherDetails(url: string): Observable<OtherDetails> {
    return this.http.get<OtherDetails>(url).pipe(
      map((poke) => {
        const obj = {
          height: poke.height,
          weight: poke.weight,
          types: poke.types,
        };
        return obj;
      })
    );
  }

  
}
