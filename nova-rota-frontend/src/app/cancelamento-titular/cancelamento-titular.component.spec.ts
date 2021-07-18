import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelamentoTitularComponent } from './cancelamento-titular.component';

describe('CancelamentoTitularComponent', () => {
  let component: CancelamentoTitularComponent;
  let fixture: ComponentFixture<CancelamentoTitularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelamentoTitularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelamentoTitularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
