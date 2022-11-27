import { Component, OnInit } from '@angular/core';
import { OtherDetails, Pokemon } from '../interfaces/pokemon';
import { PokemonService } from '../services/pokemon.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

interface PokemonEnc {
  pokemon: Pokemon
  details: Observable<OtherDetails>
}

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: PokemonEnc[] = [];
  //pokemons:Pokemon[] = [];
  otherDetails: OtherDetails = new OtherDetails();
  pageActual:number = 1;

  constructor(private pokemonService:PokemonService) { }

  ngOnInit(): void {
    this.getPokemons().subscribe(res => this.pokemons = res);
  }

  getPokemons(): Observable<PokemonEnc[]>{
    return this.pokemonService.getAllPokemons().pipe(
      map(res => {
        return res.map(pokemon => {
          return {
            pokemon,
            details: this.pokemonService.getOtherDetails(pokemon.url),
          }
        })
      })
    )
  }

}
