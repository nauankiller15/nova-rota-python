import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltEmpresaDetailsComponent } from './alt-empresa-details.component';

describe('AltEmpresaDetailsComponent', () => {
  let component: AltEmpresaDetailsComponent;
  let fixture: ComponentFixture<AltEmpresaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltEmpresaDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltEmpresaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
