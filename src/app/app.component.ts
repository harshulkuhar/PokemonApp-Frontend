import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'All Pokemon';

  public pokemons: Pokemon[];
  constructor(private pokemonService: PokemonService) { }

  ngOnInit(){
    this.getAllPokemon();
  }

  public getAllPokemon(): void{
    this.pokemonService.getAllPokemon().subscribe(
                              (response: Pokemon[]) => {
                                this.pokemons = response;
                              },
                              (error: HttpErrorResponse) => {
                                alert(error.message);
                              });
  }

}
