import { Component } from '@angular/core';
import { ShopService } from '../../shop/shop.service';

@Component({
  selector: 'app-list-famille',
  templateUrl: './list-famille.component.html',
  styleUrls: ['./list-famille.component.scss']
})
export class ListFamilleComponent {

  familles: any[] = [];
  search: string = '';
  filteredFamilles : any[] = [];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getFamilles(); 
  }

  getFamilles(): void {
    this.shopService.getFamilles().subscribe({
      next: (response) => {
        console.log(response)
        this.familles = response;
        this.onSearchChanges();
      },
      error: (error) => console.error(error)
    });
  }

  filterBySearch(famille: any): boolean {
    const searchLower = this.search.toLowerCase();
    return (
      famille.id.toString().includes(searchLower) ||
      famille.name.toLowerCase().includes(searchLower) 
    );
  }

  
  onSearchChanges() {
    this.filteredFamilles = this.familles.filter(famille =>
      this.filterBySearch(famille) 
   
    );}


  onSearchChange(searchValue: string): void {
    this.search = searchValue;
    this.getFamilles();
  }

  deleteFamille(id: number) {
    this.shopService.deleteBrand(id).subscribe({
      next: () => {
        this.getFamilles(); 
      },
      error: (error) => console.log(error)
    });
  }

}
