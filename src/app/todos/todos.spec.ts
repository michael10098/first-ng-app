import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Todos } from './todos';

describe('Todos', () => {
  let component: Todos;
  let fixture: ComponentFixture<Todos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Todos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Todos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
