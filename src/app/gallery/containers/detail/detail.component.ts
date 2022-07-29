import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  constructor(
    private activatedRoute: ActivatedRoute,
    private charactersService: CharactersService,
  ) { }  

  ngOnInit(): void {
    const characterId = this.activatedRoute.snapshot.params['id'];
    this.characterInfo$ = this.charactersService.apiGetOneCharacter(characterId);
    /* console.log('snapshot: ', data);
    this.activatedRoute.params
    .pipe(takeUntil(this.unsuscribeObservables$))
    .subscribe((params: Params) => {
      console.log('paramsSubscribe: ', params['id']);
    }); */
  }

  ngOnDestroy(): void {
    this.unsuscribeObservables$.next(true);
    this.unsuscribeObservables$.complete();
  }

}
