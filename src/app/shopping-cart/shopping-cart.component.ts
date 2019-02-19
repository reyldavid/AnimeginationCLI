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
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartProducts: CartItem[];
  order: Order;
  address: { city: string, state: string } = 
           { city: "", state: ""};
  isFreeShipping: boolean = false;
  isDiscount: boolean = false;
  cartItemSubscription: Subscription;

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
    if (this.sessionService.isAuthenticated()) {

      this.cartService.getCartItems(this.sessionService.UserToken, CartType.shoppingCart)
        .subscribe( items => {
          console.log('cart items');
          console.log(items);
          this.cartProducts = items;

          this.getTotals();
      })

      console.log('address');
      console.log(this.sessionService.UserAccount.Address.concat(
        this.sessionService.UserAccount.City, this.sessionService.UserAccount.State));
    }
  }

  getTotals() {
    this.orderService.getOrderTotals(this.sessionService.UserToken, CartType.shoppingCart)
      .subscribe( orders => {
        console.log('order totals');
        console.log(orders);
        this.order = orders[0];

        this.isFreeShipping = this.order.subTotal > 0 && 
            this.order.shippingHandling == 0 ? true : false;

        this.isDiscount = this.order.discounts > 0 ? true : false;

        this.address.city = this.sessionService.UserAccount.City;
        this.address.state = this.sessionService.UserAccount.State;

        this.messageService.setSpinner(false);
    })
  }
  
}
