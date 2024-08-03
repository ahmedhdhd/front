import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { CheckoutService } from '../checkout.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;
  deliveryMethods: DeliveryMethod[] = [];

  constructor(private checkoutService: CheckoutService, private basketService: BasketService) {}

  ngOnInit(): void {
   /* this.checkoutService.getDeliveryMethods().subscribe({
      next: dm => this.deliveryMethods = dm
    })*/
   this.deliveryMethods = [
    {shortName: "Méthode 1",
      deliveryTime: "3 jours",
      description: "Livraison dans 3 jours",
      price: 10,
      id: 1

    },
    {shortName: "Méthode 2",
      deliveryTime: "5jours",
      description: "Livraison dans 5 jours",
      price: 7,
      id: 2

    },    {shortName: "Méthode 3",
      deliveryTime: "free",
      description: "Dépot",
      price: 7,
      id: 3

    },
   ]
  }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
  }
}