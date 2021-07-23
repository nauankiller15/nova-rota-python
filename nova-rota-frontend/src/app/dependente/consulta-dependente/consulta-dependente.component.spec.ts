import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDependenteComponent } from './consulta-dependente.component';

describe('ConsultaDependenteComponent', () => {
  let component: ConsultaDependenteComponent;
  let fixture: ComponentFixture<ConsultaDependenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaDependenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDependenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
