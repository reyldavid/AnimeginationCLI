import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountModel } from '../../models/userAccountModel';
import { SessionService } from '../../services/session.service';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs/Subscription';
import { UtilityService } from '../../services/utilities.service';
import { OrderService } from '../../services/orders.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.css']
})
export class CheckoutReviewComponent implements OnInit {

  userAccount: UserAccountModel = {
    userId: "", userName: "",
    firstName: "", lastName: "",
    address: "", city: "", state: "", stateId: 0, zipCode: "",
    cellPhone: "", homePhone: "",
    email: "", created: "",
    creditCardType: "", creditCardNumber: "", creditCardExpiration: ""
  };
  accountSubscription: Subscription;
  shipDate: string = "";

  constructor( private _router: Router, 
               private _messageService: MessageService, 
               private _sessionService: SessionService, 
               private _orderService: OrderService, 
               private _utils: UtilityService ) { 
    this.accountSubscription = _messageService.getUserAccount().subscribe( userAccount => {
      this.userAccount = userAccount;

      this._messageService.setSpinner(false);
    });
  }

  ngOnInit() {
    console.log('checkout review init');
    this.userAccount = this._sessionService.UserAccount;
    this.shipDate = this._utils.getShippingDate();
}

  placeOrder() {
    console.log('Update Order!');
    this._sessionService.Order.trackingNumber = this._utils.getTrackingNumber();
    this._sessionService.Order.isPurchased = true;
    this._sessionService.Order.orderType = "History";
    this._orderService.updateOrder(this._sessionService.UserToken, this._sessionService.Order)
      .subscribe( response => {
        console.log('updated response: ');
        console.log(response);

        this._messageService.setOrder(null);
        this._messageService.setSpinner(false);
    },  
    (error: string) => {
      console.log(error);
      this._messageService.setSpinner(false);
    });
    this._router.navigate(['/checkout-thankyou']);
  }

}
