import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from '../../models/orderModel';
import { OrderService } from '../../services/orders.service';
import { MessageService } from '../../services/message.service';
import { SessionService } from '../../services/session.service';
import { UserAccountModel } from '../../models/userAccountModel';
import { Subscription } from 'rxjs/Subscription';
import { UtilityService } from '../../services/utilities.service';
import { OrderItem } from '../../models/orderItemModel';
import * as _ from 'lodash';

@Component({
  selector: 'app-orders-summary',
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.css']
})
export class OrdersSummaryComponent implements OnInit {

  orderItems: OrderItem[];
  orderID: string;
  orderNumber: string = "";
  orderDate: string = "";
  shipDate: string = "";
  orderStatus: string = "";
  deliveryStatus: string = "";
  trackingNumber: string = "";
  itemQuantity: number = 0;
  subTotal: number = 0;
  userAccount: UserAccountModel = {
    userId: "", userName: "",
    firstName: "", lastName: "",
    address: "", city: "", state: "", stateId: 0, zipCode: "",
    cellPhone: "", homePhone: "",
    email: "", created: "",
    creditCardType: "", creditCardNumber: "", creditCardExpiration: ""
  };
  accountSubscription: Subscription;

  constructor( private _router: Router, private _route: ActivatedRoute, 
               private _orderService: OrderService, 
               private _sessionService: SessionService, 
               private _utils: UtilityService, 
               private _messageService: MessageService ) { 
      this.accountSubscription = _messageService.getUserAccount().subscribe( userAccount => {
        this.userAccount = userAccount;

        this._messageService.setSpinner(false);
      });
  }

  @Input() set order(order: Order) {
    console.log("order ID ", order.orderID);
    this.orderID = order.orderID;
    this.getOrder(order);  
  }

  ngOnInit() {
    console.log('order summary init');
    this.userAccount = this._sessionService.UserAccount;
  }

  ngOnDestroy() {
    this.accountSubscription.unsubscribe();
  }

  getOrder(order: Order) {
    this.orderNumber = this._utils.getOrderNumber(order);
    
    this.orderDate = this._utils.formatDate(new Date(order.orderDate));
    this.shipDate = this._utils.getShippingDate(this.orderDate);
    this.orderStatus = this._utils.isInTransit(this.orderDate) ? "In Transit" : "Shipped Complete";
    this.deliveryStatus = this._utils.isInTransit(this.orderDate) ? "Arriving by" : "Delivered";

    this.trackingNumber = order.trackingNumber;
    this.getOrderItems(order);

    console.log("aya order ", order);
  }

  getOrderItems(order: Order) {
    let token = this._sessionService.UserToken;
    this._orderService.getOrderItemsById(token, parseInt(order.orderID))
      .subscribe((orderItems: OrderItem[]) => 
    {
      this.orderItems = orderItems;

      this.itemQuantity = _.reduce(this.orderItems, (res, item) => {
        res = res + item.Quantity;
        return res;
      }, 0);

      let subtotal = _.reduce(this.orderItems, (res, item) => {
        res = res + (item.UnitPrice * item.Quantity);
        return res;
      }, 0);
      this.subTotal = Math.round(subtotal * 100) / 100;
    })
  }

  seeDetails() {
    console.log('order ID: ' + this.orderID);
    this._router.navigate(['/orders-details'], { queryParams: {  orderID: this.orderID } });
  }

}
