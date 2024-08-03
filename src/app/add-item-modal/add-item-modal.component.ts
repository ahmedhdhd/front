import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';
import { DétailsCommande } from '../shared/models/user';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.scss']
})
export class AddItemModalComponent implements OnInit {
  @Output() itemAdded = new EventEmitter<number>();
  baseUrl = environment.apiUrl;

  itemForm: FormGroup;
  productCtrl = new FormControl();
  filteredProducts: Observable<Product[]>;
  products: Product[] = [];
  selectedProduct: Product | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.itemForm = this.fb.group({
      name: [''],
      Qte: ['']
    });

    this.filteredProducts = this.productCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterProducts(value || ''))
    );
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.http.get<Product[]>(this.baseUrl + 'Produit/all').subscribe(
      (products: Product[]) => {
        if (Array.isArray(products)) {
          this.products = products;
        } else {
          this.products = [];
        }
      },
      error => {
        console.error('Failed to load products:', error);
        this.products = [];
      }
    );
  }

  private _filterProducts(value: string): Product[] {
    const filterValue = value.toLowerCase();
    return this.products.filter(product => product.name.toLowerCase().includes(filterValue));
  }

  onProductSelected(event: any): void {
    const selectedProductName = event.option.value;
    this.selectedProduct = this.products.find(product => product.name === selectedProductName);
    if (this.selectedProduct) {
      this.itemForm.patchValue({ name: this.selectedProduct.name });
    }
  }

  addItem(): void {
    const formValue = this.itemForm.value;
    if (this.selectedProduct) {
      const detailsCommande: DétailsCommande = {
        qte: formValue.Qte,
        prixUnitaire: this.selectedProduct.prixTTC,
        prixTotal: formValue.Qte * this.selectedProduct.prixTTC,
        idProduit: this.selectedProduct.id,
        id: 0
      };
      console.log('Item added:', detailsCommande);
    }
  }
}
