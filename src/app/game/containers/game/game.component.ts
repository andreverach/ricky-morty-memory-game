import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastService } from '@core/services/toast.service';
import { interval, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { Character } from 'src/app/core/models/character';
import { CharactersService } from 'src/app/core/services/characters.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {  
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
  ) { 
    console.log('constructor');
    //load componentns at rhwe runtimeCompenntFactoryalgo asi
    //replay subject
  }  
  
  ngOnInit(): void {
    console.log('init');
    //podriamos mostrar una animacion como inicio antes de seleccionar una dificultad
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
      this.characters = this.concatAndShuffle(characters);
      console.log('characters-generated: ', this.characters);
    });
  }  

  ngAfterViewInit(): void {
    console.log('Lifecycle ngAfterViewInit');
  }

  showToast(message:string, classname: string){
    //bg-success text-light es la clase por defecto
    //position-absolute top-50 start-50 translate-middle para centrarlo en pantalla
    this.toastService.show(
      message,
      { 
        classname: classname + ' text-light position-absolute top-50 start-50 translate-middle', 
        delay: 3000 
      });//3seg
  }

  getCharacters(difficulty: number){
    if(difficulty > 0){
      const stringIds = this.charactersService.generateIds(difficulty);
      return this.charactersService.apiGetCharacters(stringIds);
    }else {
      return [];
    }
  }

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

  clickCharacter(obj: any){//que nohaga nada si da clic en el mismo index
    //solo agrego cuando no hay intentos o cuando hay 1 intento y el que viene es diferente
    if(this.attemps.length === 0 
      || this.attemps.length === 1 && this.attemps[0].index !== obj.index){
      this.attemps.push(obj);
    }
    //si ya tiene 2 intentos
    if(this.attemps.length === 2){//cuando sea el 2do click ya verifica
      this.disabledItems = true;//al entrar a verificar inhabilito los items
      const winPoints = this.characters.length / 2;
      if(this.attemps[0].character.id === this.attemps[1].character.id){//si adivina
        this.hits++;//suma los hits
        this.disabledItems = false;
        console.log('has acertado!', this.hits);
        if(this.hits === winPoints){//si los hits es igual a los puntos que tiene que adivinar
          this.showToast('Congratulations, you win!', 'bg-success');
          console.log('El juego ha terminado!', this.hits);//gana el juego
          this.resetGame();//se resetean los puntos
          this.difficulty.setValue('');//seteo la dificultad
        }
      }else{//si falla
        this.failures++;//suma las fallas
        console.log('has fallado!', this.failures);
        console.log('intentos: ', this.attemps);
        this.blurCards(this.attemps);
      }
      this.attemps = [];//lo vacio cada vez que acierta o falla o cuando ya tiene 2 intentos
    }
  }

  //reset hits and failures points and character list elements
  resetGame(): void{
    this.hits = 0;
    this.failures = 0;
    this.attemps = [];//limpio intentos
    this.characterElement = new QueryList<ElementRef>;
    this.disabledItems = false;//habilito los items
    this.characters = [];//limpio los personajes    
    console.log('Elementos creados: ', this.characterElement.length);//confirmo que han sido eliminados
  }

  blurCards(attemps: any[]){
    console.log('blurCards', attemps);    
    const firstItem: any = this.characterElement.find((element: any) => element.indexCharacter === attemps[0].index);
    const secondItem: any = this.characterElement.find((element: any) => element.indexCharacter === attemps[1].index);
    interval(2000)//probablemente con una animacion me evite el interval
    .pipe(take(1))
    .subscribe(value => {
      console.log('intervalo: ', value);
      firstItem.image = 'assets/rm-bg.png';
      secondItem.image = 'assets/rm-bg.png';
      this.disabledItems = false;//habilito los items
    });
  }
  
  ngOnDestroy(): void {
    //valueChanges unsuscribe
    this.unsuscribeObservables$.next(true);
    this.unsuscribeObservables$.complete();
    //totast list clear
    this.toastService.clear();
  }
}
