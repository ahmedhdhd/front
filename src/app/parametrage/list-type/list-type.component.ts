import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../shop/shop.service';
import { Router } from '@angular/router';

interface Type {
  id: number;
  name: string;
}

@Component({
  selector: 'app-list-type',
  templateUrl: './list-type.component.html',
  styleUrls: ['./list-type.component.scss']
})
export class ListTypeComponent implements OnInit {

  types: any[] = [];
  search = '';
  filteredTypes : any[] = [];

  constructor(private shopService: ShopService, private router: Router) {}

  ngOnInit(): void {
    this.getTypes(); 
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (response) => {
        this.types = response;
        this.onSearchChanges();
      },
      error: (error) => console.log(error)
    });
  }

  filterBySearch(type: Type): boolean {
    const searchLower = this.search.toLowerCase();
    return (
      type.id.toString().includes(searchLower) ||
      type.name.toLowerCase().includes(searchLower) 
     
    );
  }

  
  onSearchChanges() {
    this.filteredTypes = this.types.filter(type =>
      this.filterBySearch(type) 
      // this.filterByPrixTTC(product) &&
      // this.filterByPrixBarre(product)
    );}

  onSearchChange(searchValue: string): void {
    this.search = searchValue;
    this.getTypes();
  }

  deleteType(id: number) {
    this.shopService.deleteType(id).subscribe({
      next: () => {
        this.ngOnInit(); 
      },
      error: (error) => console.log(error)
    });
  }
}
