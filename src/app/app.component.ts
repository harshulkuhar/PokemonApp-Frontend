import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

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

  public onAddPokemon(addForm: NgForm): void{
    document.getElementById('add-pokemon-form-exit').click(); //Click on the Close button to get rid of the Modal window, then work with the JSON output.

    this.pokemonService.addPokemon(addForm.value).subscribe(
                              (response: string) => {
                                console.log(response);
                                this.getAllPokemon();
                              },
                              (error: HttpErrorResponse) => {
                                alert(error.message);
                              });
  }

  public onOpenModal(pokemon: Pokemon, mode: string): void{

    const container = document.getElementById('main-container'); // The container we will add our modal in.

    const button = document.createElement('button');
    button.type = 'button'; // We are changing the type of the button to string instead of the default type which is a Button.
    button.style.display = 'none'; // We will hide this button since we dont need it to be shown anywhere on the UI.
    button.setAttribute('data-toggle', 'modal'); // Setting the attribute of this button to that of a modal.

    // FOR ADD POKEMON
    if (mode === 'add'){
      button.setAttribute('data-target', '#addPokemonModal');
    }

    // FOR UPDATE POKEMON
    if (mode === 'update'){
      button.setAttribute('data-target', '#updatePokemonModal');
    }

    // FOR DELETE POKEMON
    if (mode === 'delete'){
      button.setAttribute('data-target', '#deletePokemonModal');
    }

    // FOR SEARCHING A SPECIFIC POKEMON
    if (mode === 'find'){
      button.setAttribute('data-target', '#findPokemonModal');
    }

    /** Now that we have configured our button, we can add it to the container. */
    container.appendChild(button);
    button.click(); // Clicks the button for you.

  }

}
