import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlteracaoEmpresaComponent } from './alteracao-empresa.component';

describe('AlteracaoEmpresaComponent', () => {
  let component: AlteracaoEmpresaComponent;
  let fixture: ComponentFixture<AlteracaoEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlteracaoEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlteracaoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
