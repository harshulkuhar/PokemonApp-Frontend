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

  public OnOpenModal(pokemon: Pokemon, mode: string): void{
    const button = document.createElement('button');
    button.type = 'button'; // We are changing the type of the button to string instead of the default type which is a Button.
    button.style.display = 'none'; // We will hide this button since we dont need it to be shown anywhere on the UI.

  }

}
