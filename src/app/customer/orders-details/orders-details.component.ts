import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from '../../models/orderModel';
import { OrderService } from '../../services/orders.service';
import { MessageService } from '../../services/message.service';
import { SessionService } from '../../services/session.service';
import { UserAccountModel } from '../../models/userAccountModel';
import { Subscription } from 'rxjs/Subscription';
import { UtilityService } from '../../services/utilities.service';
import { Globals } from '../../globals';
import { OrderItem } from '../../models/orderItemModel';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent implements OnInit, OnDestroy {

  order: Order;
  orderItems: OrderItem[];
  orderID: number;
  userAccount: UserAccountModel = {
    userId: "", userName: "",
    firstName: "", lastName: "",
    address: "", city: "", state: "", stateId: 0, zipCode: "",
    cellPhone: "", homePhone: "",
    email: "", created: "",
    creditCardType: "", creditCardNumber: "", creditCardExpiration: ""
  };
  accountSubscription: Subscription;
  orderNumber: string = "";
  orderDate: string = "";
  shipDate: string = "";
  orderStatus: string = "";
  deliveryStatus: string = "";
  trackingNumber: string = "";

  constructor( private _router: Router, private _route: ActivatedRoute, 
               private _orderService: OrderService, 
               private _sessionService: SessionService, 
               private _utils: UtilityService, 
               private _globals: Globals, 
               private _messageService: MessageService ) { 
     this.accountSubscription = _messageService.getUserAccount().subscribe( userAccount => {
       this.userAccount = userAccount;
 
       this._messageService.setSpinner(false);
     });
   }

  ngOnInit() {
    this.userAccount = this._sessionService.UserAccount;
    this.shipDate = this._utils.getShippingDate();

    this._route.paramMap.subscribe(params => {
      let orderIDparam = Number(params.get('orderID'));

      if (orderIDparam) {
        this.getOrder(orderIDparam);
      }
    })

    this._route.queryParams.subscribe(params => {
        this.orderID = params.orderID;

        if (this.orderID) {
            this._messageService.setOrderId(this.orderID);

            this.getOrder(this.orderID);
        }
    })
  }

  ngOnDestroy() {
    this.accountSubscription.unsubscribe();
  }

  getOrder(orderID: number) {
    let token = this._sessionService.UserToken;
    this._orderService.getOrderById(token, orderID).subscribe((order: Order[]) => 
    {
        this.order = order[0];
        // this.orderNumber = this.order ? this._globals.orderPrefix + this.order.orderID : "";
        this.orderNumber = this._utils.getOrderNumber(this.order);
        
        this.orderDate = this._utils.formatDate(new Date(this.order.orderDate));
        this.shipDate = this._utils.getShippingDate(this.orderDate);
        this.orderStatus = this._utils.isInTransit(this.orderDate) ? "In Transit" : "Shipped Complete";
        this.deliveryStatus = this._utils.isInTransit(this.orderDate) ? "Arriving by" : "Delivered";
        this.trackingNumber = this.order.trackingNumber;

        this.getOrderItems(orderID)
    });
  }

  getOrderItems(orderId: number) {
    let token = this._sessionService.UserToken;
    this._orderService.getOrderItemsById(token, orderId).subscribe((orderItems: OrderItem[]) => 
    {
      this.orderItems = orderItems;

      this._messageService.setSpinner(false);
      window.scrollTo(0,0);        
    })
  }

}
