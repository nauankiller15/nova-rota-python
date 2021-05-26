import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoDependenteComponent } from './novo-dependente.component';

describe('NovoDependenteComponent', () => {
  let component: NovoDependenteComponent;
  let fixture: ComponentFixture<NovoDependenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoDependenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoDependenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
