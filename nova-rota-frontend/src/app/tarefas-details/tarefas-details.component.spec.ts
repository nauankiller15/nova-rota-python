import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefasDetailsComponent } from './tarefas-details.component';

describe('TarefasDetailsComponent', () => {
  let component: TarefasDetailsComponent;
  let fixture: ComponentFixture<TarefasDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarefasDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarefasDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
