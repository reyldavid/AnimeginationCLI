import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/accounts.service';
import { TokenModel } from '../models/tokenmodel';
import { LoginModel } from '../models/loginmodel';
import { SessionService } from '../services/session.service';
import { UserAccountsService } from '../services/userAccounts.service';
import { UserAccountModel } from '../models/userAccountModel';
import { MessageService } from '../services/message.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private router: Router, 
        private route: ActivatedRoute, 
        private accountsService: AccountService, 
        private sessionService: SessionService, 
        private userAccountService: UserAccountsService, 
        private messageService: MessageService, 
        private loginService: LoginService) { }

    token: TokenModel = { "token": "" };
    loginInput: LoginModel = { username: "", password: "" };
    userAccount: UserAccountModel = {
        UserId: "", UserName: "",
        FirstName: "", LastName: "",
        Address: "", City: "", State: "", StateId: 0, ZipCode: "",
        CellPhone: "", HomePhone: "",
        Email: "", Created: "",
        CreditCardType: "", CreditCardNumber: "", CreditCardExpiration: ""
    };
    isInvalidAccount: boolean = false;
    returnUrl: string;

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
                        this.loginService.login(userAccount.FirstName);

                        this.messageService.selectUserAccount(userAccount);
                        this.messageService.setSpinner(false);

                        // this.router.navigate(['/account']);
                        this.router.navigateByUrl(this.returnUrl);
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
}
