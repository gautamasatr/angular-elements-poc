import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, delay, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shell-angular';

  todoUrl = 'https://jsonplaceholder.typicode.com/todos';

  selectedTodo: any = null;

  getSelectedTodo(event: any){
    this.selectedTodo = event?.detail;
  }
}
