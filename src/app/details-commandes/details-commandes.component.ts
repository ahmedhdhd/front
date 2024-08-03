import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../commandes/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { AddItemModalComponent } from '../add-item-modal/add-item-modal.component';

@Component({
  selector: 'app-details-commandes',
  templateUrl: './details-commandes.component.html',
  styleUrls: ['./details-commandes.component.scss']
})
export class DetailsCommandesComponent implements OnInit {

  order?: any;
  ide: any;

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private bcService: BreadcrumbService,
    private dialog: MatDialog
  ) {
    this.bcService.set('@OrderDetailed', ' ');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ide = parseInt(id, 10);
      this.getOrderDetails(this.ide);
    }
  }

  getOrderDetails(id: number) {
    this.orderService.getCommandeDetailed(id.toString()).subscribe({
      next: order => {
        console.log(order);
        this.order = order;
      },
      error: err => console.error(err)
    });
  }

  deleteitems(commandid: number, itemid: number) {
    this.orderService.deleteitems(commandid, itemid).subscribe({
      next: () => {
        this.getOrderDetails(this.ide);
      },
      error: err => console.error(err)
    });
  }

  additem(commandid: number, itemid: number) {
    this.orderService.addItemToCommande(commandid, itemid).subscribe({
      next: () => {
        this.getOrderDetails(this.ide);
      },
      error: err => console.error(err)
    });
  }

  openAddItemModal() {
    const dialogRef = this.dialog.open(AddItemModalComponent);

    dialogRef.componentInstance.itemAdded.subscribe((itemId: number) => {
      this.handleItemAdded(itemId);
    });
  }

  handleItemAdded(itemId: number) {
    this.additem(this.ide, itemId);
  }
}
