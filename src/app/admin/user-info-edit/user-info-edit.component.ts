import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserAccountModel } from '../../models/userAccountModel';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { UserAccountsService } from '../../services/userAccounts.service';
import { MessageService } from '../../services/message.service';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { StatesService } from '../../services/states.service';
import { States } from '../../models/states';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-info-edit',
  templateUrl: './user-info-edit.component.html',
  styleUrls: ['./user-info-edit.component.css']
})
export class UserInfoEditComponent implements OnInit {

  userAccount: UserAccountModel = {
    userId: "", userName: "",
    firstName: "", lastName: "",
    address: "", city: "", state: "", stateId: 0, zipCode: "",
    cellPhone: "", homePhone: "",
    email: "", created: "",
    creditCardType: "", creditCardNumber: "", creditCardExpiration: ""
  };
  submitted: boolean = false;
  userID: string;
  userAccountSubscription: Subscription;
  states: States[];

  constructor(private userAccountsService: UserAccountsService, 
              private sessionService: SessionService, 
              private messageService: MessageService, 
              private statesService: StatesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let userIDparam = params.get('userAccountID');

      if (userIDparam) {
        this.userID = userIDparam;
        // this.getGenre();
      }
    })

    this.route.queryParams.subscribe(params => {
        this.userID = params.userAccountID;
        if (this.userID) {
          // this.getGenre();
        }
    })

    this.statesService.getAnimeStates().subscribe(states => {
      this.states = states;
      this.statesService.States = states;
    })

    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;
      let __this = this;

      this.userAccountSubscription = this.userAccountsService
          .getUserAccounts(token).subscribe(users => {

            let user = _.find(users, function(item) {
              return item.userId == __this.userID;
            } ) 
            this.userAccount = user;
            this.messageService.setSpinner(false);
      })
    }
  }

  ngOnDestroy() {
    this.userAccountSubscription.unsubscribe();
  }

  selectState(stateId: number) {
    this.userAccount.stateId = stateId;
  }

  onSubmit() {
    this.submitted = true;

    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;

      this.userAccountsService.updateUserAccount(token, this.userAccount)
        .subscribe(user => {
          this.messageService.setSpinner(false);
        }, 
        (error) => {
          this.messageService.setSpinner(false);
          console.log("Error updating user: ", error);
        })
    }
  }

}
