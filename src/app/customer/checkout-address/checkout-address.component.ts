import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountModel } from '../../models/userAccountModel';
import { SessionService } from '../../services/session.service';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css']
})
export class CheckoutAddressComponent implements OnInit {
    userAccount: UserAccountModel = {
        userId: "", userName: "",
        firstName: "", lastName: "",
        address: "", city: "", state: "", stateId: 0, zipCode: "",
        cellPhone: "", homePhone: "",
        email: "", created: "",
        creditCardType: "", creditCardNumber: "", creditCardExpiration: ""
    };
    accountSubscription: Subscription;

    constructor(public _router: Router, 
        private _sessionService: SessionService, 
        private _messageService: MessageService )
    {
        this.accountSubscription = _messageService.getUserAccount().subscribe( userAccount => {
            this.userAccount = userAccount;
            
            this._messageService.setSpinner(false);
      })
    }

    ngOnInit(): any {
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
