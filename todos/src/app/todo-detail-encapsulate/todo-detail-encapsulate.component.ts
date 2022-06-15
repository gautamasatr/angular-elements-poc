import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, Observable, shareReplay, startWith, Subject, switchMap, tap } from 'rxjs';
import { Todo } from '../models/Todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'tf-todo-detail-encapsulate',
  templateUrl: './todo-detail-encapsulate.component.html',
  styleUrls: ['./todo-detail-encapsulate.component.css'],

  // isolate component within shadow down
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TodoDetailEncapsulateComponent {

  constructor(
    private _todoService: TodoService
  ) { }

  @Input() set url(value: string){
    this._url$.next(value);
  }

  @Output() todo = new EventEmitter<Todo>();

  private _url$ = new BehaviorSubject<string | null>(null);

  private _todoDetail$: Observable<Todo | null> = this._url$.pipe(
    distinctUntilChanged(),
    filter((url) => !!url),
    switchMap((url) => this._todoService.getTodo(url!)),
    tap((todo) => {
      this.todo.emit(todo)
    }),
    shareReplay(),
    startWith(null)
  )

  vm$ = combineLatest([
    this._todoDetail$
  ]).pipe(
    map(([todoDetail]) => ({todoDetail}))
  )
}
