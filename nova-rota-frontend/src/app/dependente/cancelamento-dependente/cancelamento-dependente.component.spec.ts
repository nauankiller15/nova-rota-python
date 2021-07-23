import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelamentoDependenteComponent } from './cancelamento-dependente.component';

describe('CancelamentoDependenteComponent', () => {
  let component: CancelamentoDependenteComponent;
  let fixture: ComponentFixture<CancelamentoDependenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelamentoDependenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelamentoDependenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
