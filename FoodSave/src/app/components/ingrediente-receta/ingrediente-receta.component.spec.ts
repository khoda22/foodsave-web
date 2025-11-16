import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredienteRecetaComponent } from './ingrediente-receta.component';

describe('IngredienteRecetaComponent', () => {
  let component: IngredienteRecetaComponent;
  let fixture: ComponentFixture<IngredienteRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredienteRecetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredienteRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
