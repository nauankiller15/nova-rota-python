import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoTitularComponent } from './novo-titular.component';

describe('NovoTitularComponent', () => {
  let component: NovoTitularComponent;
  let fixture: ComponentFixture<NovoTitularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoTitularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoTitularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
