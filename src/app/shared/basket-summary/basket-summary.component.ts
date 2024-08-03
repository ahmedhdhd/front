import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from '../models/basket';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent {
  @Output() addItem = new EventEmitter<BasketItem>();
  @Output() removeItem = new EventEmitter<{id: number, quantity: number}>();
  @Input() isBasket = true;
  baseurl=environment.apiUrl
  constructor(public basketService: BasketService) {}

  addBasketItem(item: BasketItem) {
    this.addItem.emit(item)
  }

  removeBasketItem(id: number, quantity = 1) {
    this.removeItem.emit({id, quantity})
  }


  updateQuantity(item: BasketItem, quantity: string) {
    const newQuantity = parseInt(quantity, 10);
    if (newQuantity > 0) {
      const difference = newQuantity - item.quantity;
      if (difference > 0) {
        for (let i = 0; i < difference; i++) {
          this.addBasketItem(item);
        }
      } else {
        for (let i = 0; i < Math.abs(difference); i++) {
          this.removeBasketItem(item.id, 1);
        }
      }
    }
  }
}