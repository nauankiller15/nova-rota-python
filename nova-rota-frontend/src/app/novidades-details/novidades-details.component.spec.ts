import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovidadesDetailsComponent } from './novidades-details.component';

describe('NovidadesDetailsComponent', () => {
  let component: NovidadesDetailsComponent;
  let fixture: ComponentFixture<NovidadesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovidadesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovidadesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
