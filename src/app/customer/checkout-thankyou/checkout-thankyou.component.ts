import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { UtilityService } from '../../services/utilities.service';
import { UserAccountModel } from '../../models/userAccountModel';
import { Order } from '../../models/orderModel';
import { Globals } from '../../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-thankyou',
  templateUrl: './checkout-thankyou.component.html',
  styleUrls: ['./checkout-thankyou.component.css']
})
export class CheckoutThankyouComponent implements OnInit {

  userAccount: UserAccountModel = {
    userId: "", userName: "",
    firstName: "", lastName: "",
    address: "", city: "", state: "", stateId: 0, zipCode: "",
    cellPhone: "", homePhone: "",
    email: "", created: "",
    creditCardType: "", creditCardNumber: "", creditCardExpiration: ""
  };
  order: Order;
  shipDate: string = "";    
  orderNumber: string = "";

  constructor( private _sessionService: SessionService, 
               private _utils: UtilityService, 
               private _globals: Globals, 
               private _router: Router ) { 
               }

  ngOnInit() {
    this.userAccount = this._sessionService.UserAccount;
    this.order = this._sessionService.Order;
    this.shipDate = this._utils.getShippingDate();

    // this.orderNumber = this.order ? this._globals.orderPrefix + this.order.orderID : "";
    this.orderNumber = this._utils.getOrderNumber(this.order);
  }

  goDetails() {
    this._router.navigate(["/orders-details"], { queryParams: { orderID: this.order.orderID } });
  }

}
