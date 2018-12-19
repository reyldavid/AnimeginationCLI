import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountsService } from '../services/userAccounts.service';
import { TokenModel } from '../models/tokenModel';
import { UserAccountModel } from '../models/userAccountModel';
import { LoginService } from '../services/login.service';
import { SessionService } from '../services/session.service';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
    // Here we define this component's instance variables
    // They're accessible from the template
    // token: TokenModel = { token: "" };
    userAccount: UserAccountModel = {
        UserId: "", UserName: "",
        FirstName: "", LastName: "",
        Address: "", City: "", State: "", StateId: 0, ZipCode: "",
        CellPhone: "", HomePhone: "",
        Email: "", Created: "",
        CreditCardType: "", CreditCardNumber: "", CreditCardExpiration: ""
    };
    response: string;
    recentPurchases: string;
    missingAddressBook: string;
    incompleteAddressBook: string;
    accountSubscription: Subscription;

    constructor(public _router: Router, 
        private _userAccountService: UserAccountsService,
        private _loginService: LoginService, 
        private _sessionService: SessionService, 
        private _messageService: MessageService )
    {
        console.log('account info construct');
        // We get the JWT from localStorage
        // this.token.token = localStorage.getItem('jwt');
        // this.token = _sessionService.UserToken;
        // We also store the decoded JSON from this JWT
        //this.decodedJwt = this.jwt && (<any>window).jwt_decode(this.jwt);

        this.accountSubscription = _messageService.getUserAccount().subscribe( userAccount => {
            this.userAccount = userAccount;
            
            this._loginService.login(userAccount.FirstName);
            this._messageService.setSpinner(false);
      })

    }

    logout() {
        // Method to be called when the user wants to logout
        // Logging out means just deleting the JWT from localStorage and redirecting the user to the Login page
        // localStorage.removeItem('jwt');
        this._sessionService.clearSession();
        this._router.navigate(['/login']);
    }

    ngOnInit(): any {
        console.log('account info init');
        this.recentPurchases = 'You Don\'t Have Any Purchases In Your Account Right Now';
        this.missingAddressBook = 'We have no default address on file for this account';
        this.incompleteAddressBook = "The default address on file is incomplete";
        this.userAccount = this._sessionService.UserAccount;
    }

    goOrders() {
    }

    goProfile() {
        this._router.navigate(['/profile']);
    }

    goAddress() {
        this._router.navigate(['/address']);
    }
}
