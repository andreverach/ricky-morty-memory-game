import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CharacterInfo } from '@core/models/character';
import { CharactersService } from '@core/services/characters.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  unsuscribeObservables$: Subject<boolean> = new Subject();
  characterInfo$!: Observable<CharacterInfo>;
  characterId: number = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private charactersService: CharactersService,
    private route: Router
  ) { }  

  ngOnInit(): void {
    //this.characterId = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.params
      .pipe(takeUntil(this.unsuscribeObservables$))
      .subscribe((params: Params) => {
        this.characterId = params['id'];
        this.getCharacter();
      });    
    /* console.log('snapshot: ', data);
    */
  }

  getCharacter(){
    this.characterInfo$ = this.charactersService.apiGetOneCharacter(this.characterId);
  }

  previousCharacter(){
    if(this.characterId > 1){
      this.characterId--;
      this.route.navigate(['/gallery/character', this.characterId]);
    }    
  }

  nextCharacter(){
    if(this.characterId < 826){
      this.characterId++;
      this.route.navigate(['/gallery/character', this.characterId]);
    }
  }

  ngOnDestroy(): void {
    this.unsuscribeObservables$.next(true);
    this.unsuscribeObservables$.complete();
  }

}
