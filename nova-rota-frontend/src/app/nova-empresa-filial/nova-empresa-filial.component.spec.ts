import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaEmpresaFilialComponent } from './nova-empresa-filial.component';

describe('NovaEmpresaFilialComponent', () => {
  let component: NovaEmpresaFilialComponent;
  let fixture: ComponentFixture<NovaEmpresaFilialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaEmpresaFilialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaEmpresaFilialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
