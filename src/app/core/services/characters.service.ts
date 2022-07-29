import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character, CharacterInfo } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(
    private httpClient: HttpClient
  ) { }


  apiGetCharactersGame(stringIds: string): Observable<Character[]>{
    return this.httpClient.get<Character[]>(`${environment.apiUrl}character/${stringIds}`);
  }
  
  apiGetCharactersPaginate(page: number): Observable<Character[]>{
    const pageUrl = page>0?'?page='+page:'';
    return this.httpClient.get<Character[]>(`${environment.apiUrl}character${pageUrl}`);
  }

  apiGetOneCharacter(id: number): Observable<CharacterInfo>{
    return this.httpClient.get<CharacterInfo>(`${environment.apiUrl}character/${id}`);
  }

  generateIds(difficulty: number): string{
    //genero un numero aleatorio que abarca todo desde el 1 al 826 entero
    //la suma dentro del random es para que abarque todo y la suma de afuera
    //es porque el floor te da el menor mas cercano entonces asi con +1 redondeo mejor
    let stringIds = "";
    for(let i = 0; i < difficulty; i++){
      if(i == 0){//faltaria verificar que no se repitan
        stringIds += Math.floor((Math.random() * (826 - 1 + 1)) + 1);
      }else{
        stringIds +="," + Math.floor((Math.random() * (826 - 1 + 1)) + 1);
      }
    }
    //console.log('CharactersService.generateIds: ', stringIds);
    return stringIds;
  }

  //esta funcion clona al mismo array haciendolo doble para poder tener parejas
  //y las coloca en orden aleatorio
  concatAndShuffle(characters: Character[]): Character[]{
    let index, character;
    characters = characters.concat(characters);
    const length = characters.length;
    for (let i = 0; i < length; i++){
      index = Math.floor(Math.random() * length);//genero un random index en base al tamaño
      character = characters[index];//capturo al item de ese index
      characters[index] = characters[i];//en esa posicion coloco el item actual
      characters[i] = character;//y en la posicion actual coloco el item del index
    }
    return characters;
  }

  /* transformar la data que recibo
  apiGetCharacters(stringIds: string): Observable<Character[]>{
    return this.httpClient.get<Character[]>(`${environment.apiUrl}character/${stringIds}`)
    .pipe(
      map( data => data.map(character => {
        return {//fuerzo un tipado
          id: character.id,
          image: character.image,
          order: 1
        }
      }))
    );
  } */
}
