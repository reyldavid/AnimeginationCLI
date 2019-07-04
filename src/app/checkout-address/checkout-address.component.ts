import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountModel } from '../models/userAccountModel';
import { SessionService } from '../services/session.service';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css']
})
export class CheckoutAddressComponent implements OnInit {
    userAccount: UserAccountModel = {
        UserId: "", UserName: "",
        FirstName: "", LastName: "",
        Address: "", City: "", State: "", StateId: 0, ZipCode: "",
        CellPhone: "", HomePhone: "",
        Email: "", Created: "",
        CreditCardType: "", CreditCardNumber: "", CreditCardExpiration: ""
    };
    accountSubscription: Subscription;

    constructor(public _router: Router, 
        private _sessionService: SessionService, 
        private _messageService: MessageService )
    {
        console.log('account info construct');

        this.accountSubscription = _messageService.getUserAccount().subscribe( userAccount => {
            this.userAccount = userAccount;
            
            this._messageService.setSpinner(false);
      })

    }

    ngOnInit(): any {
        console.log('checkout address init');
        this.userAccount = this._sessionService.UserAccount;
    }

    goAddress() {
        this._messageService.setReturnUrl("/checkout-address");
        this._router.navigate(['/address']);
    }

    goCheckout() {
        this._router.navigate(['/checkout-review']);
    }
}
