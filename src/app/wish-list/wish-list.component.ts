import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { CartService } from '../services/cart.service';
import { CartType } from '../models/carttype';
import { CartItem } from '../models/cartItemModel';
import { OrderService } from '../services/orders.service';
import { Order } from '../models/orderModel';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  cartProducts: CartItem[];
  order: Order;
  cartItemSubscription: Subscription;
  cartType: CartType = CartType.wishList;
  isEmpty: boolean = true;

  constructor( private sessionService: SessionService, 
              private cartService: CartService, 
              private orderService: OrderService, 
              private messageService: MessageService ) { 

      this.cartItemSubscription = messageService.getCartItem().subscribe( cartItem => {
        this.getCartItems();
      });
  }

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    this.isEmpty = true;
    if (this.sessionService.isAuthenticated()) {

      this.cartService.getCartItems(this.sessionService.UserToken, CartType.wishList)
        .subscribe( items => {
          console.log('cart items');
          console.log(items);
          this.cartProducts = items;

          this.getTotals();
      })
    }
  }

  getTotals() {
    this.orderService.getOrderTotals(this.sessionService.UserToken, CartType.wishList)
      .subscribe( order => {

        if (order.orderID) {
          console.log('order totals');
          console.log(order);
          this.order = order;
          this.isEmpty = false;  
        }
        else {
          // this.order = null;
        }
        this.messageService.setSpinner(false);
    })
  }

}
