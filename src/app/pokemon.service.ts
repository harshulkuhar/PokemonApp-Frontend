import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllPokemon(): Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>(`${this.apiServerUrl}/pokemon/all`);
  }

  public getPokemon(id: number): Observable<Pokemon>{
    return this.http.get<Pokemon>(`${this.apiServerUrl}/pokemon/${id}`);
  }

  public addPokemon(pokemon: Pokemon): Observable<string>{
    return this.http.post<string>(`${this.apiServerUrl}/pokemon/add`, pokemon);
  }

  public updatePokemon(pokemon: Pokemon): Observable<string>{
    return this.http.put<string>(`${this.apiServerUrl}/pokemon/update`, pokemon);
  }

  public deletePokemon(id: number): Observable<string>{
    return this.http.delete<string>(`${this.apiServerUrl}/pokemon/delete/${id}`);
  }

}
