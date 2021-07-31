import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReativarCadastroComponent } from './reativar-cadastro.component';

describe('ReativarCadastroComponent', () => {
  let component: ReativarCadastroComponent;
  let fixture: ComponentFixture<ReativarCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReativarCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReativarCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
