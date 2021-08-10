import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaTitularComponent } from './transferencia-titular.component';

describe('TransferenciaTitularComponent', () => {
  let component: TransferenciaTitularComponent;
  let fixture: ComponentFixture<TransferenciaTitularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferenciaTitularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferenciaTitularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
