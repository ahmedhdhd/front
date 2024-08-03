

import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/models/order';
import { Commande } from '../shared/models/user';
import { Router } from '@angular/router';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent {


  search=""
  commandes: any[] = [];

  constructor(private orderService: OrdersService , private route : Router) { }

  ngOnInit(): void {
    this.getCommandes();
  }

  getCommandes() {
    this.orderService.getallcommande().subscribe({
    next: response => {
      this.commandes = response
    },
    error : error => console.log(error)
    })
  }
  
  
  
public navigatell(id : number){
this.route.navigate([`/details/${id}`])
  }

}
