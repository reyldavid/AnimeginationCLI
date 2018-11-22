import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountsService } from '../services/userAccounts.service';
import { TokenModel } from '../models/tokenModel';
import { UserAccountModel } from '../models/userAccountModel';
import { LoginService } from '../services/login.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
    // Here we define this component's instance variables
    // They're accessible from the template
    token: TokenModel = { token: "" };
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

    constructor(public _router: Router, 
        private _userAccountService: UserAccountsService,
        private _loginService: LoginService, 
        private _sessionService: SessionService )
    {
        console.log('account info construct');
        // We get the JWT from localStorage
        // this.token.token = localStorage.getItem('jwt');
        this.token.token = _sessionService.UserToken;
        // We also store the decoded JSON from this JWT
        //this.decodedJwt = this.jwt && (<any>window).jwt_decode(this.jwt);
    }

    logout() {
        // Method to be called when the user wants to logout
        // Logging out means just deleting the JWT from localStorage and redirecting the user to the Login page
        // localStorage.removeItem('jwt');
        this._sessionService.clearToken();
        this._router.navigate(['/login']);
    }

    ngOnInit(): any {
        console.log('account info init');
        this.recentPurchases = 'You Don\'t Have Any Purchases In Your Account Right Now';
        this.missingAddressBook = 'We have no default address on file for this account';
        this.incompleteAddressBook = "The default address on file is incomplete";

        if (this.token && this.token.token) {
          this._userAccountService.getUserAccount(this.token)
          .subscribe((userAccount: UserAccountModel) => {
              this.userAccount = userAccount;
              this._loginService.login(userAccount.FirstName);
          },
          (error: string) => {
            if (error.includes("401")) {
              //this.unauthorized = true;
            } else if (error.includes("404")) {
              //this.unauthorized = true;
            } else {
              console.log('account info get user error: ' + error);
            }
          }
        );
      }
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
