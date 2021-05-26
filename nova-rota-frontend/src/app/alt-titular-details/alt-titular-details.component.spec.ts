import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltTitularDetailsComponent } from './alt-titular-details.component';

describe('AltTitularDetailsComponent', () => {
  let component: AltTitularDetailsComponent;
  let fixture: ComponentFixture<AltTitularDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltTitularDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltTitularDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
