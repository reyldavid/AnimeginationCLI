import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountsService } from '../services/userAccounts.service';
import { UserAccountModel } from '../models/userAccountModel';
import { UserAccountReturnModel } from '../models/userAccountReturnModel';
import { SessionService } from '../services/session.service';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs/Subscription';
import { StatesService } from '../services/states.service';
import { States } from '../models/states';

@Component({
  selector: 'app-address-settings',
  templateUrl: './address-settings.component.html',
  styleUrls: ['./address-settings.component.css']
})
export class AddressSettingsComponent implements OnInit {

  addressInput: UserAccountModel = {
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
    this.addressInput.StateId = stateId;
    this.isDirty = true;
  }

  Update(addressInput: UserAccountModel, isValid: boolean) {

    if (isValid) {
      if (this._sessionService.isAuthenticated()) {
        let token = this._sessionService.UserToken;
  
        this._userAccountService.updateUserAccountAddress(token, this.addressInput)
            .subscribe((userAccount: UserAccountReturnModel) => {
              this.addressInput.Address = userAccount.streetAddress;
              this.addressInput.City = userAccount.city;
              this.addressInput.State = userAccount.state.stateName;
              this.addressInput.StateId = userAccount.state.stateID;
              this.addressInput.ZipCode = userAccount.zipCode;

              let sessionAccount = this._sessionService.UserAccount;
              sessionAccount.Address = userAccount.streetAddress;
              sessionAccount.City = userAccount.city;
              sessionAccount.State = userAccount.state.stateName;
              sessionAccount.ZipCode = userAccount.zipCode;

              this._sessionService.UserAccount = sessionAccount;

              this.isSuccess = true;
              this.isFailure = false;
              this.isDirty = false;
            }, 
        (error: string) => {
          this.isSuccess = false;
          this.isFailure = true;
          console.log("Updating user address: ", error);
        })  
      }
    }
    else {
      this.isSuccess = false;
      this.isFailure = true;
    }
  }

}
