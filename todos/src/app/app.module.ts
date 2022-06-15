import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { TodoComponent } from './todo/todo.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoEncapsulateComponent } from './todo-encapsulate/todo-encapsulate.component';
import { TodoDetailEncapsulateComponent } from './todo-detail-encapsulate/todo-detail-encapsulate.component';

@NgModule({
  declarations: [TodoComponent, TodoDetailComponent, TodoEncapsulateComponent, TodoDetailEncapsulateComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [],
  entryComponents:[TodoComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const todoEl = createCustomElement(TodoComponent, { injector: this.injector });
    customElements.define('tf-todo', todoEl);

    const todoDetailEl = createCustomElement(TodoDetailComponent, { injector: this.injector });
    customElements.define('tf-todo-detail', todoDetailEl);

    const todoEncapsulateEl = createCustomElement(TodoEncapsulateComponent, { injector: this.injector });
    customElements.define('tf-todo-encapsulate', todoEncapsulateEl);

    const todoDetailEncapsulateEl = createCustomElement(TodoDetailEncapsulateComponent, { injector: this.injector });
    customElements.define('tf-todo-detail-encapsulate', todoDetailEncapsulateEl);
  }
}
