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
  selector: 'app-buy-list',
  templateUrl: './buy-list.component.html',
  styleUrls: ['./buy-list.component.css']
})
export class BuyListComponent implements OnInit {

  cartProducts: CartItem[];
  order: Order;
  address: { city: string, state: string } = 
           { city: "", state: ""};
  isFreeShipping: boolean = false;
  isDiscount: boolean = false;
  cartItemSubscription: Subscription;
  cartType: CartType = CartType.shoppingCart;
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

      this.cartService.getCartItems(this.sessionService.UserToken, CartType.shoppingCart)
        .subscribe( items => {
          console.log('cart items');
          console.log(items);
          this.cartProducts = items;

          this.getTotals();
      })
    }
  }

  getTotals() {
    this.orderService.getOrderTotals(this.sessionService.UserToken, CartType.shoppingCart)
      .subscribe( order => {

        if (order.orderID) {
          console.log('order totals');
          console.log(order);
          this.order = order;
          this.isEmpty = false;
  
          this.isFreeShipping = this.order.subTotal > 0 && 
              this.order.shippingHandling == 0 ? true : false;
  
          this.isDiscount = this.order.discounts > 0 ? true : false;
  
          this.address.city = this.sessionService.UserAccount.City;
          this.address.state = this.sessionService.UserAccount.State;  
        }
        else {
          this.isEmpty = true;
          this.isFreeShipping = false;
          this.isDiscount = false;
          this.address.city = "";
          this.address.state = "";  
        }
        this.messageService.setSpinner(false);
      },  
      (error: string) => {
        console.log(error);
        this.messageService.setSpinner(false);
  })
  }
  
}
