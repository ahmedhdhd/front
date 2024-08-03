import { Component } from '@angular/core';
import { User } from '../../shared/models/user';
import { ShopService } from '../../shop/shop.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {

  users: User[] = [];
  filteredUsers: User[] = [];
  search: string = '';
  

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers(); 
  }

  getUsers() {
    this.userService.getutilisateurs().subscribe({
      next: (response) => {
        this.users = response;
        this.onSearchChanges();
      },
      error: (error) => console.log(error)
    });
  }

  
  filterBySearch(user: User): boolean {
    const searchLower = this.search.toLowerCase();
    return (
      user.fullName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.phoneNumber.toLowerCase().includes(searchLower)
    );
  }

  
  onSearchChanges() {
    this.filteredUsers = this.users.filter(user =>
      this.filterBySearch(user) 
      // this.filterByPrixTTC(product) &&
      // this.filterByPrixBarre(product)
    );}

  onSearchChange(searchValue: string): void {
    this.search = searchValue;
    this.getUsers();
  }

  deleteUser(id: number) {
    this.userService.deleteuser(id).subscribe({
      next: () => {
        this.getUsers(); 
      },
      error: (error) => console.log(error)
    });
  }

}
