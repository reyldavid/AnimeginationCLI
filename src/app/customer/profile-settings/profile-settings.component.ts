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
    userId: "", userName: "",
    firstName: "", lastName: "",
    address: "", city: "", state: "", stateId: 0, zipCode: "",
    cellPhone: "", homePhone: "",
    email: "", created: "",
    creditCardType: "", creditCardNumber: "", creditCardExpiration: ""
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
              this.profileInput.firstName = userAccount.firstName;
              this.profileInput.lastName = userAccount.lastName;
              this.profileInput.email = userAccount.emailAddress;
              this.profileInput.cellPhone = userAccount.cellPhoneNumber;
              this.profileInput.homePhone = userAccount.homePhoneNumber;

              let sessionAccount = this._sessionService.UserAccount;
              sessionAccount.firstName = userAccount.firstName;
              sessionAccount.lastName = userAccount.lastName;
              sessionAccount.email = userAccount.emailAddress;
              sessionAccount.cellPhone = userAccount.cellPhoneNumber;
              sessionAccount.homePhone = userAccount.homePhoneNumber;

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
