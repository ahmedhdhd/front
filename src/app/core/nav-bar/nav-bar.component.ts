import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket';
import { User } from 'src/app/shared/models/user';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
  currentUser: User | null = null;

  constructor(public shopservice :ShopService,public basketService: BasketService, public accountService: AccountService) {
    this.accountService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }
  ngOnInit(): void {
this.getmenu()  }

  getCount(items: BasketItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  isUserAdmin(): boolean {
    return this.currentUser?.type === 1;
  }

  isUserLoggedIn(): boolean {
    return this.currentUser !== null;
  }
  getmenu(){
    return this.shopservice.getmenu().subscribe({
      next :response=>{
console.log(response)
      }
    })
  }
}



// import { Component } from '@angular/core';
// import { AccountService } from 'src/app/account/account.service';
// import { BasketService } from 'src/app/basket/basket.service';
// import { BasketItem } from 'src/app/shared/models/basket';

// @Component({
//   selector: 'app-nav-bar',
//   templateUrl: './nav-bar.component.html',
//   styleUrls: ['./nav-bar.component.scss']
// })
// export class NavBarComponent {

//   constructor(public basketService: BasketService, public accountService: AccountService) {}

//   getCount(items: BasketItem[]) {
//     return items.reduce((sum, item) => sum + item.quantity, 0);
//   }
// }
