import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { interval, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { ToastService } from '@core/services/toast.service';
import { Character } from '@core/models/character';
import { CharactersService } from '@core/services/characters.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit, OnDestroy {  
  //characters$!: Observable<Character[]>;
  characters: Character[] = [];
  difficulty: FormControl = new FormControl('');
  unsuscribeObservables$: Subject<boolean> = new Subject();
  classColumn: string = "";
  showImages: boolean = false;
  attemps: any[] = [];
  hits: number = 0;
  failures: number = 0;
  disabledItems: boolean = false;  
  //guardo la referencia de todos los elementos creados
  @ViewChildren('characterElement') private characterElement!: QueryList<ElementRef>;

  constructor(
    private charactersService: CharactersService,
    public toastService: ToastService
  ) { }  
  
  ngOnInit(): void {
    //console.log('GameComponent.ngOnInit');
    this.difficulty.valueChanges.
    pipe(
      takeUntil(this.unsuscribeObservables$),
      tap(() => this.showImages = false),
      switchMap(difficulty => {
        this.resetGame();//limpio aciertos y fallos        
        this.classColumn = "col-md-" + (12/difficulty);//agregarle apara sm y xs
        return this.getCharacters(difficulty);
      })
    ).
    subscribe(characters => {
      this.showImages = true;
      this.characters = this.charactersService.concatAndShuffle(characters);
    });
  }  

  showToast(message:string, classname: string){
    //bg-success text-light es la clase por defecto del toast (bg-success lo envio por variable)
    //position-absolute top-50 start-50 translate-middle para centrar el toast en pantalla
    //text-center solo para centrar el texto
    this.toastService.show(
      message,
      { 
        classname: classname + ' text-light text-center position-absolute top-50 start-50 translate-middle', 
        delay: 3000
      });//3seg
  }

  getCharacters(difficulty: number){
    //esto me soluciona para cuando sete el value del difficulty a vacio ya que busca y al ser vacio me da un error poraqui
    if(difficulty > 0){
      const stringIds = this.charactersService.generateIds(difficulty);
      return this.charactersService.apiGetCharactersGame(stringIds);
    }else {
      return [];//y ya al ser vacio entonces devuelvo un array vacio
    }
  }  

  clickCharacter(obj: any){//que nohaga nada si da clic en el mismo index
    //si el que viene aun no ha sido emparejado !obj.matched
    //cuando no hay intentos this.attemps.length === 0
    //o cuando hay 1 intento y el que viene es diferente this.attemps.length === 1 && this.attemps[0].index !== obj.index    
    if(this.attemps.length === 0 && !obj.matched
      || this.attemps.length === 1 && !obj.matched && this.attemps[0].index !== obj.index){
      this.attemps.push(obj);
    }
    //si ya tiene 2 intentos
    if(this.attemps.length === 2){//cuando sea el 2do click ya verifica
      this.disabledItems = true;//al entrar a verificar inhabilito los items
      const winPoints = this.characters.length / 2;
      //console.log(this.attemps);
      if(this.attemps[0].character.id === this.attemps[1].character.id){//si adivina
        this.hits++;//suma los hits
        this.disabledItems = false;
        this.matchedCards(this.attemps);//los envio para matchear
        //console.log('has acertado!', this.hits);
        if(this.hits === winPoints){//si los hits es igual a los puntos que tiene que adivinar
          //(this.hits + this.failures) sumando se mostraria la cantidad de intentos
          this.showToast('Congratulations, you win!', 'bg-success');
          //console.log('El juego ha terminado!', this.hits);//gana el juego
          interval(2000)
          .pipe(take(1))
          .subscribe(() => {
            this.resetGame();//se resetean los puntos
            this.difficulty.setValue('');//seteo la dificultad
          });
        }
      }else{//si falla
        this.failures++;//suma las fallas
        //console.log('has fallado!', this.failures);        
        this.blurCards(this.attemps);//los envio para ocultar
      }
      this.attemps = [];//lo vacio cada vez que acierta o falla o cuando ya tiene 2 intentos
    }
  }

  //reset hits and failures points and character list elements
  resetGame(): void{
    this.hits = 0;
    this.failures = 0;
    this.attemps = [];//limpio intentos
    this.characterElement = new QueryList<ElementRef>; //this.characterElement.length
    this.disabledItems = false;//habilito los items
    this.characters = [];//limpio los personajes
  }

  blurCards(attemps: any[]){
    const firstItem: any = this.characterElement.find((element: any) => element.indexCharacter === attemps[0].index);
    const secondItem: any = this.characterElement.find((element: any) => element.indexCharacter === attemps[1].index);
    interval(2000)//probablemente con una animacion me evite el interval
    .pipe(take(1))
    .subscribe(value => {
      //console.log('intervalo: ', value);
      firstItem.image = 'assets/rm-bg.png';
      secondItem.image = 'assets/rm-bg.png';
      this.disabledItems = false;//habilito los items
    });
  }

  matchedCards(attemps: any[]){//podria quitar tambien la clase del puntero
    const firstItem: any = this.characterElement.find((element: any) => element.indexCharacter === attemps[0].index);
    const secondItem: any = this.characterElement.find((element: any) => element.indexCharacter === attemps[1].index);
    firstItem.matched = true;
    secondItem.matched = true;
  }
  
  ngOnDestroy(): void {
    //valueChanges unsuscribe
    this.unsuscribeObservables$.next(true);
    this.unsuscribeObservables$.complete();
    //totast list clear
    this.toastService.clear();
  }
}
