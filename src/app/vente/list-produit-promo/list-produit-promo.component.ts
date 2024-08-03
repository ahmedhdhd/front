import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-list-produit-promo',
  templateUrl: './list-produit-promo.component.html',
  styleUrls: ['./list-produit-promo.component.scss']
})
export class ListProduitPromoComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  search: string = '';
  // minPrixTTC: number | null = null;
  // maxPrixTTC: number | null = null;
  // minPrixBarre: number | null = null;
  // maxPrixBarre: number | null = null;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();  
  }

  getProducts() {
    this.shopService.getallproduct(true).subscribe({
      next: response => {
        this.products = response;
        this.onSearchChange();
      },
      error: error => console.log(error)
    });
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

  // filterByPrixTTC(product: Product): boolean {
  //   const minPrixTTC = this.minPrixTTC ?? -Infinity;
  //   const maxPrixTTC = this.maxPrixTTC ?? Infinity;
  //   return product.prixTTC != null && product.prixTTC >= minPrixTTC && product.prixTTC <= maxPrixTTC;
  // }
  
  // filterByPrixBarre(product: Product): boolean {
  //   const minPrixBarre = this.minPrixBarre ?? -Infinity;
  //   const maxPrixBarre = this.maxPrixBarre ?? Infinity;
  //   return product.prixBarre != null && product.prixBarre >= minPrixBarre && product.prixBarre <= maxPrixBarre;
  // }


}



// import { Component, OnInit } from '@angular/core';
// import { Product } from 'src/app/shared/models/product';
// import { ShopService } from 'src/app/shop/shop.service';

// @Component({
//   selector: 'app-list-produit-promo',
//   templateUrl: './list-produit-promo.component.html',
//   styleUrls: ['./list-produit-promo.component.scss']
// })
// export class ListProduitPromoComponent implements OnInit {
//   products: Product[] = [];
//   filteredProducts: Product[] = [];
//   search: string = '';

//   constructor(private shopService: ShopService) {}

//   ngOnInit(): void {
//     this.getProducts();
//   }

//   getProducts() {
//     this.shopService.getallproduct(true).subscribe({
//       next: response => {
//         this.products = response;
//         this.filteredProducts = response; // Initialize filteredProducts
//       },
//       error: error => console.log(error)
//     });
//   }

//   filterProducts() {
//     this.filteredProducts = this.products.filter(product =>
//       product.name.toLowerCase().includes(this.search.toLowerCase())
//     );
//   }
// }




// import { Component, OnInit } from '@angular/core';
// import { Product } from 'src/app/shared/models/product';
// import { ShopService } from 'src/app/shop/shop.service';


// @Component({
//   selector: 'app-list-produit-promo',
//   templateUrl: './list-produit-promo.component.html',
//   styleUrls: ['./list-produit-promo.component.scss']
// })
// export class ListProduitPromoComponent implements OnInit {
//   products: Product[] = [];
  
//   constructor ( private shopService: ShopService) {}

//   ngOnInit(): void {
//     this.getProducts();  
//   }

//   getProducts() {
//     this.shopService.getallproduct(true).subscribe({
//       next: response => {
//         this.products = response;
//       },
//       error: error => console.log(error)
//     })
//   }

 
 

// }
