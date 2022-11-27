import { Component, Input, OnInit } from '@angular/core';
import { OtherDetails, Pokemon } from '../interfaces/pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  @Input()
  pokemon:Pokemon = new Pokemon();

  @Input()
  details?: OtherDetails|null

  constructor() { }

  ngOnInit(): void {
  }

}
