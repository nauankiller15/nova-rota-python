import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaDependenteComponent } from './transferencia-dependente.component';

describe('TransferenciaDependenteComponent', () => {
  let component: TransferenciaDependenteComponent;
  let fixture: ComponentFixture<TransferenciaDependenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferenciaDependenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferenciaDependenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
