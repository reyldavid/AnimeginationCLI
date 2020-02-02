import { Component, OnInit } from '@angular/core';
import { UserAccountsService } from '../../services/userAccounts.service';
import { UserAccountModel } from '../../models/userAccountModel';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userAccounts: UserAccountModel[] = [];

  constructor( private router: Router,
               private userAccountsService: UserAccountsService, 
               private sessionService: SessionService, 
               private messageService: MessageService ) { }

  ngOnInit() {
    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;

      this.userAccountsService.getUserAccounts(token).subscribe(userAccounts => {
        this.userAccounts = userAccounts;
        // this.userAccountsService.getUserAccountCache(userAccounts);
        this.messageService.setSpinner(false);
      })
    }
  }

  OnEditUserAccount(userAccount: UserAccountModel) {
    this.router.navigate(['/user-info-edit'], { queryParams: {  userAccountID: userAccount.userId } });
  }

}

