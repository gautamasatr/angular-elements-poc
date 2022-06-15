import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, Observable, shareReplay, startWith, Subject, switchMap, tap } from 'rxjs';
import { Todo } from '../models/Todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent {

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
