import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/parametrage/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent {
  

  clients: User[] = [];
  search: string = '';
  filteredClients:User[] = [];
  

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers(); 
  }

  getUsers() {
    this.userService.getclients().subscribe({
      next: (response) => {
        this.clients = response;
        this.onSearchChanges();
      },
      error: (error) => console.log(error)
    });
  }

  filterBySearch(client: User): boolean {
    const searchLower = this.search.toLowerCase();
    return (
      client.fullName.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      client.phoneNumber.toLowerCase().includes(searchLower)
    );
  }

  onSearchChanges() {
    this.filteredClients = this.clients.filter(client =>
      this.filterBySearch(client) 
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
