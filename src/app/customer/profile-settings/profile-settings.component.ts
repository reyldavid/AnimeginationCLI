import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountsService } from '../../services/userAccounts.service';
import { UserAccountModel } from '../../models/userAccountModel';
import { UserAccountReturnModel } from '../../models/userAccountReturnModel';
import { SessionService } from '../../services/session.service';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  profileInput: UserAccountModel = {
    UserId: "", UserName: "",
    FirstName: "", LastName: "",
    Address: "", City: "", State: "", StateId: 0, ZipCode: "",
    CellPhone: "", HomePhone: "",
    Email: "", Created: "",
    CreditCardType: "", CreditCardNumber: "", CreditCardExpiration: ""
  };
  accountSubscription: Subscription;
  isSuccess: boolean;
  isFailure: boolean;
  isDirty: boolean = false;

  constructor(public _router: Router, 
      private _userAccountService: UserAccountsService,
      private _sessionService: SessionService, 
      private _messageService: MessageService )
  {
      console.log('profile settings construct');

      this.accountSubscription = _messageService.getUserAccount().subscribe( userAccount => {
          this.profileInput = userAccount;
        })

  }

  ngOnInit() {
    console.log('profile settings init');

    if (this._sessionService.isAuthenticated()) {
      this.profileInput = this._sessionService.UserAccount;
    }
  }

  Update(profileInput: UserAccountModel, isValid: boolean) {

    if (isValid) {
      if (this._sessionService.isAuthenticated()) {
        let token = this._sessionService.UserToken;
  
        this._userAccountService.updateUserAccountNames(token, this.profileInput)
            .subscribe((userAccount: UserAccountReturnModel) => {
              this.profileInput.FirstName = userAccount.firstName;
              this.profileInput.LastName = userAccount.lastName;
              this.profileInput.Email = userAccount.emailAddress;
              this.profileInput.CellPhone = userAccount.cellPhoneNumber;
              this.profileInput.HomePhone = userAccount.homePhoneNumber;

              let sessionAccount = this._sessionService.UserAccount;
              sessionAccount.FirstName = userAccount.firstName;
              sessionAccount.LastName = userAccount.lastName;
              sessionAccount.Email = userAccount.emailAddress;
              sessionAccount.CellPhone = userAccount.cellPhoneNumber;
              sessionAccount.HomePhone = userAccount.homePhoneNumber;

              this._sessionService.UserAccount = sessionAccount;

              this.isSuccess = true;
              this.isFailure = false;
              this.isDirty = false;

              this._messageService.setSpinner(false);
            }, 
        (error: string) => {
          this.isSuccess = false;
          this.isFailure = true;
          console.log("Updating user profile: ", error);
          this._messageService.setSpinner(false);
        })  
      }
    }
    else {
      this.isSuccess = false;
      this.isFailure = true;
    }
  }

}
