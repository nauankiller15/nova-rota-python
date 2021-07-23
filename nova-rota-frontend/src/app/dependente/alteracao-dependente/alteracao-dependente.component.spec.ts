import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlteracaoDependenteComponent } from './alteracao-dependente.component';

describe('AlteracaoDependenteComponent', () => {
  let component: AlteracaoDependenteComponent;
  let fixture: ComponentFixture<AlteracaoDependenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlteracaoDependenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlteracaoDependenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
