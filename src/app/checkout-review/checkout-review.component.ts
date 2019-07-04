import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountsService } from '../services/userAccounts.service';
import { TokenModel } from '../models/tokenModel';
import { UserAccountModel } from '../models/userAccountModel';
import { LoginService } from '../services/login.service';
import { SessionService } from '../services/session.service';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs/Subscription';
import { UtilityService } from '../services/utilities.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.css']
})
export class CheckoutReviewComponent implements OnInit {

  userAccount: UserAccountModel = {
    UserId: "", UserName: "",
    FirstName: "", LastName: "",
    Address: "", City: "", State: "", StateId: 0, ZipCode: "",
    CellPhone: "", HomePhone: "",
    Email: "", Created: "",
    CreditCardType: "", CreditCardNumber: "", CreditCardExpiration: ""
  };
  accountSubscription: Subscription;
  shipDate: string = "";

  constructor( private _router: Router, 
               private _messageService: MessageService, 
               private _sessionService: SessionService, 
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
    console.log('Go Place Order!');
    // this._router.navigate(['/checkout-review']);
  }

}
