import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduitPromoComponent } from './list-produit-promo.component';

describe('ListProduitPromoComponent', () => {
  let component: ListProduitPromoComponent;
  let fixture: ComponentFixture<ListProduitPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProduitPromoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProduitPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
