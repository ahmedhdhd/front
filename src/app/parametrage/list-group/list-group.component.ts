import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../shop/shop.service';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent implements OnInit {

  groups: any[] = [];
  filteredGroups: any[] = [];
  search: string = '';

  constructor(private groupService: ShopService) { }

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.groupService.getGroups().subscribe(
      groups => {
        this.groups = groups;
        this.filteredGroups = groups;
      },
      error => console.error('Error loading groups', error)
    );
  }

  onSearchChanges(): void {
    if (this.search) {
      this.filteredGroups = this.groups.filter(group => group.name.toLowerCase().includes(this.search.toLowerCase()));
    } else {
      this.filteredGroups = this.groups;
    }
  }

  deleteGroup(id: number): void {
    
      this.groupService.deleteGroup(id).subscribe(
        () => this.filteredGroups = this.filteredGroups.filter(group => group.id !== id),
        error => console.error('Error deleting group', error)
      );
      this.loadGroups()
  }
}
