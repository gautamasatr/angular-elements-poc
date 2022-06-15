import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoEncapsulateComponent } from './todo-encapsulate.component';

describe('TodoEncapsulateComponent', () => {
  let component: TodoEncapsulateComponent;
  let fixture: ComponentFixture<TodoEncapsulateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoEncapsulateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoEncapsulateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
