import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.scss']
})
export class ListProduitComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  search: string = '';
 
  
  constructor(private shopService: ShopService) {}
  ngOnInit(): void {
this.getProducts()  }

  getProducts() {
    this.shopService.getallproduct(false).subscribe({
      next: response => {
        this.products = response;
        this.onSearchChange();
      },
      error: error => console.log(error)
    })
  }
  


 


  filterBySearch(product: Product): boolean {
    const searchLower = this.search.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.famille.name.toLowerCase().includes(searchLower) ||
      product.type.name.toLowerCase().includes(searchLower)
    );
  }

  
  onSearchChange() {
    this.filteredProducts = this.products.filter(product =>
      this.filterBySearch(product) 
      // this.filterByPrixTTC(product) &&
      // this.filterByPrixBarre(product)
    );
  }






  deleteProduct(id : number){
this.shopService.deleteproduct(id).subscribe({
  next :() => { this.ngOnInit() } ,

  error: error => console.log(error)


})
  }

}
