import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/accounts.service';
import { TokenModel } from '../models/tokenmodel';
import { LoginModel } from '../models/loginmodel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(public router: Router,
        public accountsService: AccountService) { }

    token: TokenModel = { "token": "" };
    loginInput: LoginModel = { username: "", password: "" };
    isInvalidAccount: boolean = false;

    Login() {
        //event.preventDefault();
        this.isInvalidAccount = false;
        this.accountsService.userLogin(this.loginInput.username, this.loginInput.password)
          .subscribe((token: TokenModel) => {
                this.token = token;
                localStorage.setItem('jwt', this.token.token);

                this.router.navigate(['/account']);
            },
            error => {
              if (error.includes("404")) {
                this.isInvalidAccount = true;
              }
              else {
                console.log('user login error: ' + error);
              }
        });
    }

    ngOnInit(): any {
        console.log('login init');
    }
}
