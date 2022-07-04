import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(
    private httpClient: HttpClient
  ) { }


  apiGetCharacters(stringIds: string): Observable<Character[]>{
    return this.httpClient.get<Character[]>(`${environment.apiUrl}character/${stringIds}`);
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
    console.log('service-generateIds: ', stringIds);
    return stringIds;
  }

  /* apiGetCharacters(stringIds: string): Observable<Character[]>{
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
