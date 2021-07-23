import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltDependenteDetailsComponent } from './alt-dependente-details.component';

describe('AltDependenteDetailsComponent', () => {
  let component: AltDependenteDetailsComponent;
  let fixture: ComponentFixture<AltDependenteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltDependenteDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltDependenteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
