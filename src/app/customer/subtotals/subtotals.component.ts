import { Component, OnInit, Input, Output } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { CartService } from '../../services/cart.service';
import { CartType } from '../../models/carttype';
import { CartItem } from '../../models/cartItemModel';
import { OrderService } from '../../services/orders.service';
import { Order } from '../../models/orderModel';
import { OrderItem } from '../../models/orderItemModel';
import { MessageService } from '../../services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-subtotals',
  templateUrl: './subtotals.component.html',
  styleUrls: ['./subtotals.component.css']
})
export class SubtotalsComponent implements OnInit {

  @Input() set marketing(showMarketing: boolean) {
    this.showMarketing = showMarketing;
  }
  @Input() set actionButton(showButton: boolean) {
    this.showActionButton = showButton;
  }

  showActionButton: boolean = false;
  showMarketing: boolean = false;
  cartProducts: CartItem[];
  order: Order;
  orderItems: OrderItem[];
  address: { city: string, state: string } = 
           { city: "", state: ""};
  isFreeShipping: boolean = false;
  isDiscount: boolean = false;
  cartItemSubscription: Subscription;
  orderSubscription: Subscription;
  cartType: CartType = CartType.shoppingCart;

  constructor( private sessionService: SessionService, 
              private cartService: CartService, 
              private orderService: OrderService, 
              private messageService: MessageService, 
              private _router: Router, 
              private _activatedRoute: ActivatedRoute ) { 

              this.orderSubscription = messageService.getOrderId().subscribe(orderId => {
                this.getTotalsById(orderId);
            })
        }

  ngOnInit() {
    this.getTotals();
  }

  mapOrderItems(order: Order) {
    console.log('order totals');
    console.log(order);
    this.order = order;

    this.isFreeShipping = this.order.subTotal > 0 && 
        this.order.shippingHandling == 0 ? true : false;

    this.isDiscount = this.order.discounts > 0 ? true : false;

    this.address.city = this.sessionService.UserAccount.cellPhone;
    this.address.state = this.sessionService.UserAccount.state;
  }

  getOrderItems(orderId: number) {
    let token = this.sessionService.UserToken;
    this.orderService.getOrderItemsById(token, orderId).subscribe((orderItems: OrderItem[]) => 
    {
      this.orderItems = orderItems;

      this.order.itemQuantity = _.reduce(this.orderItems, (res, item) => {
        res = res + item.Quantity;
        return res;
      }, 0);

      let subtotal = _.reduce(this.orderItems, (res, item) => {
        res = res + (item.UnitPrice * item.Quantity);
        return res;
      }, 0);
      this.order.subTotal = Math.round(subtotal * 100) / 100;
    })
  }

  getTotalsById(id: number) {
    this.orderService.getOrderById(this.sessionService.UserToken, id)
      .subscribe( (orders: Order[]) => {
        let order = orders[0];

        if (order.orderID) {
          this.getOrderItems(parseInt(order.orderID));
          this.mapOrderItems(order);
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

  getTotals() {
    this.orderService.getOrderTotals(this.sessionService.UserToken, CartType.shoppingCart)
      .subscribe( order => {

        if (order.orderID) {
          this.messageService.setOrder(order);
          this.sessionService.Order = order;

          this.mapOrderItems(order);
        }
        this.messageService.setSpinner(false);
      },  
      (error: string) => {
        console.log(error);
        this.messageService.setSpinner(false);
    })
  }

  goCheckout() {
    this._router.navigate(['/checkout-address']);
    // , { queryParams: { productID: product.ProductID } });
  }  
}
