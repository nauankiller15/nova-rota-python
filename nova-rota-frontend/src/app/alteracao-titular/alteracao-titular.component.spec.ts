import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlteracaoTitularComponent } from './alteracao-titular.component';

describe('AlteracaoTitularComponent', () => {
  let component: AlteracaoTitularComponent;
  let fixture: ComponentFixture<AlteracaoTitularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlteracaoTitularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlteracaoTitularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
