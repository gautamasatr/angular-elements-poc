import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailEncapsulateComponent } from './todo-detail-encapsulate.component';

describe('TodoDetailEncapsulateComponent', () => {
  let component: TodoDetailEncapsulateComponent;
  let fixture: ComponentFixture<TodoDetailEncapsulateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoDetailEncapsulateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoDetailEncapsulateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
