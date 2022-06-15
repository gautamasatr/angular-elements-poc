import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private _http: HttpClient
  ) { }

  getTodos(url: string): Observable<Todo[]>{
    return this._http.get(url).pipe(
      map((response: any) => response?.map((resp: any) => Todo.parse(resp)))
    );
  }

  getTodo(url: string): Observable<Todo>{
    return this._http.get(url).pipe(
      map((response: any) => Todo.parse(response))
    );
  }

}