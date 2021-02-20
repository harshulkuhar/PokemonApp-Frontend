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
  public pokemonToBeEdited: Pokemon; // this variable will contain the value of the pokemon that needs to be edited, when the edit button is clicked.
  public pokemonToBeDeleted: Pokemon; // this variable will contain the value of the pokemon that needs to be edited, when the edit button is clicked.

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(){
    this.getAllPokemon();
  }

  /**
   * The function to get all Pokemon to display as cards on the frontend.
   */
  public getAllPokemon(): void {
    this.pokemonService.getAllPokemon().subscribe(
                              (response: Pokemon[]) => { // waits for a response of which should be an array of Pokemon objects.
                                this.pokemons = response;
                              },
                              (error: HttpErrorResponse) => { // otherwise it returns an error.
                                alert(error.message);
                              });
  }

  public onAddPokemon(addForm: NgForm): void {
    document.getElementById('add-pokemon-form-exit').click(); //Click on the Close button to get rid of the Modal window, then work with the JSON output.

    this.pokemonService.addPokemon(addForm.value).subscribe(
                              (response: string) => {
                                console.log(response);
                                this.getAllPokemon();
                                addForm.reset(); // To reset the form.
                              },
                              (error: HttpErrorResponse) => {
                                alert(error.message);
                              });
  }

  public onUpdatePokemon(pokemon: Pokemon): void {
    this.pokemonService.updatePokemon(pokemon).subscribe(
                              (response: string) => {
                                console.log(response);
                                this.getAllPokemon();
                              },
                              (error: HttpErrorResponse) => {
                                alert(error.message);
                              });
  }

  public onDeletePokemon(id: number): void {
    this.pokemonService.deletePokemon(id).subscribe(
                              (response: string) => {
                                console.log(response);
                                this.getAllPokemon();
                              },
                              (error: HttpErrorResponse) => {
                                alert(error.message);
                              });
  }

  public onSearchPokemon(key: string): void {
    console.log(key);
    const results: Pokemon[] = [];
    for (const pokemon of this.pokemons) {
      if (pokemon.id === Number(key)
      || pokemon.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || pokemon.type.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || pokemon.region.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(pokemon);
      }
    }
    this.pokemons = results;
    if (results.length === 0 || !key) {
      this.getAllPokemon();
    }
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
      this.pokemonToBeEdited = pokemon;
      button.setAttribute('data-target', '#updatePokemonModal');
    }

    // FOR DELETE POKEMON
    if (mode === 'delete'){
      this.pokemonToBeDeleted = pokemon;
      button.setAttribute('data-target', '#deletePokemonModal');
    }

    /** Now that we have configured our button, we can add it to the container. */
    container.appendChild(button);
    button.click(); // Clicks the button for you.

  }

}
