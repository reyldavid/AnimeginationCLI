import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/accounts.service';
import { TokenModel } from '../models/tokenmodel';
import { LoginModel } from '../models/loginmodel';
import { ClaimModel } from '../models/claimmodel';
import { SessionService } from '../services/session.service';
import { UserAccountsService } from '../services/userAccounts.service';
import { UserAccountModel } from '../models/userAccountModel';
import { MessageService } from '../services/message.service';
import { LoginService } from '../services/login.service';
import { OrderService } from '../services/orders.service';
import { ISubscription } from 'rxjs/Subscription';
import { CartType } from '../models/carttype';
import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    constructor(private router: Router, 
        private route: ActivatedRoute, 
        private accountsService: AccountService, 
        private sessionService: SessionService, 
        private userAccountService: UserAccountsService, 
        private messageService: MessageService, 
        private loginService: LoginService, 
        private orderService: OrderService ) { }

    token: TokenModel = { "token": "" };
    loginInput: LoginModel = { username: "", password: "" };
    userAccount: UserAccountModel = {
      userId: "", userName: "",
      firstName: "", lastName: "",
      address: "", city: "", state: "", stateId: 0, zipCode: "",
      cellPhone: "", homePhone: "",
      email: "", created: "",
      creditCardType: "", creditCardNumber: "", creditCardExpiration: ""
    };
    isInvalidAccount: boolean = false;
    returnUrl: string;
    orderSubscription: ISubscription;

    Login() {
        //event.preventDefault();
        this.isInvalidAccount = false;
        this.accountsService.userLogin(this.loginInput.username, this.loginInput.password)
          .subscribe((token: TokenModel) => {
                this.token = token;
                // localStorage.setItem('jwt', this.token.token);
                this.sessionService.UserToken = token;

                if (token && token.token) {
                    this.userAccountService.getUserAccount(token)
                    .subscribe((userAccount: UserAccountModel) => {
                        this.userAccount = userAccount;
                        this.sessionService.UserAccount = userAccount;
                        this.loginService.login(userAccount.firstName);

                        this.messageService.selectUserAccount(userAccount);
                        this.messageService.setSpinner(false);

                        this.accountsService.getUserClaim(token)
                        .subscribe((claim: ClaimModel) => {
                          console.log("aya claim ", claim);
                          let roles = claim.roles;
                          this.messageService.setRoles(roles);
                          this.messageService.setHistory();
                        })

                        this.orderSubscription = this.orderService.getOrderTotals(
                          this.sessionService.UserToken, CartType.shoppingCart)
                          .subscribe(order => {
                            this.messageService.setOrder(order);
                            // this.router.navigate(['/account']);
                            this.router.navigateByUrl(this.returnUrl);
                          })
                    },
                    (error: string) => {
                      if (error.includes("401")) {
                        //this.unauthorized = true;
                      } else if (error.includes("404")) {
                        //this.unauthorized = true;
                      } else {
                        console.log('account info get user error: ' + error);
                      }
                      this.messageService.setSpinner(false);
                    }
                  )
                }
            },
            error => {
              if (error.includes("404")) {
                this.isInvalidAccount = true;
              } else if (error.includes("404")) {
                    //this.unauthorized = true;
              } else {
                console.log('user login error: ' + error);
              }
              this.messageService.setSpinner(false);
            });
    }

    ngOnInit(): any {
        console.log('login init');

        this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    }

    ngOnDestroy() {
      if (this.orderSubscription) {
        this.orderSubscription.unsubscribe();
      }
    }
}
