import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from '../models/orderModel';
import { OrderService } from '../services/orders.service';
import { MessageService } from '../services/message.service';
import { SessionService } from '../services/session.service';
import { UserAccountModel } from '../models/userAccountModel';
import { Subscription } from 'rxjs/Subscription';
import { UtilityService } from '../services/utilities.service';
import { Globals } from '../globals';
import { OrderItem } from '../models/orderItemModel';
import { CartItem } from '../models/cartItemModel';
import { CartType } from '../models/carttype';
import * as _ from 'lodash';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders: Order[];
  order: Order;
  orderItems: OrderItem[];
  orderID: number;
  orderNumber: string = "";
  orderDate: string = "";
  shipDate: string = "";
  orderStatus: string = "";
  deliveryStatus: string = "";
  trackingNumber: string = "";
  isEmpty: boolean = true;

  constructor( private _router: Router, private _route: ActivatedRoute, 
               private _orderService: OrderService, 
               private _sessionService: SessionService, 
               private _utils: UtilityService, 
               private _messageService: MessageService ) { 
   }

   ngOnInit() {
    console.log('orders list init');
    this.getOrders();
  }

  ngOnDestroy() {
  }

  getOrders() {
    let token = this._sessionService.UserToken;
    this._orderService.getOrders(token).subscribe((orders: Order[]) => 
    {
        let history = _.filter(orders, function(order) {
          return order.OrderType.toLowerCase() == CartType.orderHistory.toLowerCase();
        });
        this.orders = this._orderService.castToOrderType(history);
        if (this.orders.length > 0) {
          this.isEmpty = false;
        }
        console.log("aya orders ", this.orders);
    });
  }

}
