import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonComponent } from './pokemon/pokemon.component';

import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  exports: [
    PokemonComponent,
    PokemonListComponent
  ]
})
export class PokemonModule { }
