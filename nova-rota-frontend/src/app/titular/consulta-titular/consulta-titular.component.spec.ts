import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTitularComponent } from './consulta-titular.component';

describe('ConsultaTitularComponent', () => {
  let component: ConsultaTitularComponent;
  let fixture: ComponentFixture<ConsultaTitularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaTitularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaTitularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
