import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, Observable, shareReplay, startWith, Subject, switchMap, tap } from 'rxjs';
import { Todo } from '../models/Todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'tf-todo-encapsulate',
  templateUrl: './todo-encapsulate.component.html',
  styleUrls: ['./todo-encapsulate.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

  // isolate component within shadow down
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TodoEncapsulateComponent {

  constructor(
    private _todoService: TodoService
  ) { }

  @Input() set url(value: string){
    this._url$.next(value);
  }

  @Output() todos = new EventEmitter<Todo[]>();

  @Output() todos$ = new EventEmitter<Observable<Todo[]>>();

  @Output() selectedTodo = new EventEmitter<Todo>();

  @Output() selectedTodo$ = new EventEmitter<BehaviorSubject<Todo | null>>();

  private _url$ = new BehaviorSubject<string | null>(null);

  private _todosReloader$ = new BehaviorSubject<boolean>(false);

  private _todos$: Observable<Todo[]> = this._url$.pipe(
    distinctUntilChanged(),
    filter((url) => !!url),
    switchMap((url) => this._todosReloader$.pipe(
      switchMap(() => this._todoService.getTodos(url!))
    )),
    tap((todos) => {
      this.todos.emit(todos);
      this.todos$.emit(this._todos$);
    }),
    shareReplay(),
    startWith([])
  )

  actionReload(){
    this._todosReloader$.next(true);
    this._selectedTodo$.next(null);
  }

  // SELECTED TODO
  private _selectedTodo$ = new BehaviorSubject<Todo | null>(null);

  actionSelectTodo(todo: Todo){
    this.selectedTodo.emit(todo);

    this._selectedTodo$.next(todo);
    this.selectedTodo$.emit(this._selectedTodo$);
  }

  // STREAM COMBINER
  vm$ = combineLatest([
    this._todos$,
    this._selectedTodo$
  ]).pipe(
    map(([todos, selectedTodo]) => ({todos, selectedTodo}))
  )
}
