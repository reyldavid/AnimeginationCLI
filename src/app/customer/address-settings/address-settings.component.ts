import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountsService } from '../../services/userAccounts.service';
import { UserAccountModel } from '../../models/userAccountModel';
import { UserAccountReturnModel } from '../../models/userAccountReturnModel';
import { SessionService } from '../../services/session.service';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs/Subscription';
import { StatesService } from '../../services/states.service';
import { States } from '../../models/states';

@Component({
  selector: 'app-address-settings',
  templateUrl: './address-settings.component.html',
  styleUrls: ['./address-settings.component.css']
})
export class AddressSettingsComponent implements OnInit {

  addressInput: UserAccountModel = {
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
  states: States[];
  currentState: States;

  constructor(public _router: Router, 
      private _userAccountService: UserAccountsService,
      private _sessionService: SessionService, 
      private _messageService: MessageService, 
      private _statesService: StatesService )
  {
      console.log('address settings construct');

      this.accountSubscription = _messageService.getUserAccount().subscribe( userAccount => {
          this.addressInput = userAccount;

          this._messageService.setSpinner(false);
        })
  }

  ngOnInit() {
    console.log('address settings init');

    if (this._sessionService.isAuthenticated()) {
      this.addressInput = this._sessionService.UserAccount;
    }

    this._statesService.getAnimeStates().subscribe(states => {
      this.states = states;
      this._statesService.States = states;
    })
  }

  selectState(stateId: number) {
    this.addressInput.stateId = stateId;
    this.isDirty = true;
  }

  Update(addressInput: UserAccountModel, isValid: boolean) {

    if (isValid) {
      if (this._sessionService.isAuthenticated()) {
        let token = this._sessionService.UserToken;
  
        this._userAccountService.updateUserAccountAddress(token, this.addressInput)
            .subscribe((userAccount: UserAccountReturnModel) => {
              this.addressInput.address = userAccount.streetAddress;
              this.addressInput.city = userAccount.city;
              this.addressInput.state = userAccount.state.stateName;
              this.addressInput.stateId = userAccount.state.stateID;
              this.addressInput.zipCode = userAccount.zipCode;

              let sessionAccount = this._sessionService.UserAccount;
              sessionAccount.address = userAccount.streetAddress;
              sessionAccount.city = userAccount.city;
              sessionAccount.state = userAccount.state.stateName;
              sessionAccount.zipCode = userAccount.zipCode;

              this._sessionService.UserAccount = sessionAccount;

              this.isSuccess = true;
              this.isFailure = false;
              this.isDirty = false;

              this._messageService.setSpinner(false);

              let returnUrl = this._messageService.getReturnUrl();
              if (returnUrl && returnUrl.length > 0) {
                this._router.navigate([returnUrl]);
              }
            }, 
        (error: string) => {
          this.isSuccess = false;
          this.isFailure = true;
          console.log("Updating user address: ", error);
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
