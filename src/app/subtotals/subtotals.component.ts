import { Component, OnInit, Input, Output } from '@angular/core';
import { SessionService } from '../services/session.service';
import { CartService } from '../services/cart.service';
import { CartType } from '../models/carttype';
import { CartItem } from '../models/cartItemModel';
import { OrderService } from '../services/orders.service';
import { Order } from '../models/orderModel';
import { MessageService } from '../services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subtotals',
  templateUrl: './subtotals.component.html',
  styleUrls: ['./subtotals.component.css']
})
export class SubtotalsComponent implements OnInit {

  @Input() set actionButton(showButton: boolean) {
    this.showActionButton = showButton;
  }

  showActionButton: boolean = false;
  cartProducts: CartItem[];
  order: Order;
  address: { city: string, state: string } = 
           { city: "", state: ""};
  isFreeShipping: boolean = false;
  isDiscount: boolean = false;
  cartItemSubscription: Subscription;
  cartType: CartType = CartType.shoppingCart;

  constructor( private sessionService: SessionService, 
              private cartService: CartService, 
              private orderService: OrderService, 
              private messageService: MessageService, 
              private _router: Router, 
              private _activatedRoute: ActivatedRoute ) { 

  }

  ngOnInit() {
    this.getTotals();
  }

  getTotals() {
    this.orderService.getOrderTotals(this.sessionService.UserToken, CartType.shoppingCart)
      .subscribe( order => {

        if (order.orderID) {
          console.log('order totals');
          console.log(order);
          this.order = order;
          this.messageService.setOrder(order);
  
          this.isFreeShipping = this.order.subTotal > 0 && 
              this.order.shippingHandling == 0 ? true : false;
  
          this.isDiscount = this.order.discounts > 0 ? true : false;
  
          this.address.city = this.sessionService.UserAccount.City;
          this.address.state = this.sessionService.UserAccount.State;  
        }
        else {
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

  goCheckout() {
    // console.log('category product ID: ' + product.ProductID);
    this._router.navigate(['/checkout-address']);
    // , { queryParams: { productID: product.ProductID } });
  }  
}
