import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserAccountModel } from '../../models/userAccountModel';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { UserAccountsService } from '../../services/userAccounts.service';
import { MessageService } from '../../services/message.service';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
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

  constructor(private userAccountsService: UserAccountsService, 
              private sessionService: SessionService, 
              private messageService: MessageService, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('user account edit init');
    this.route.paramMap.subscribe(params => {
      let userIDparam = params.get('userID');

      if (userIDparam) {
        this.userID = userIDparam;
        // this.getGenre();
      }
    })

    this.route.queryParams.subscribe(params => {
        this.userID = params.userID;
        if (this.userID) {
          // this.getGenre();
        }
    })

    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;

      this.userAccountSubscription = this.userAccountsService
          .getUserAccounts(token).subscribe(users => {

            let user = _.find(users, function(item) {
              return item.userID == this.userID;
            } ) 
            this.userAccount = user;
            this.messageService.setSpinner(false);
      })
    }
  }

  ngOnDestroy() {
    this.userAccountSubscription.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;

    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;

      this.userAccountsService.updateUserAccountAddress(token, this.userAccount)
        .subscribe(user => {
          console.log("aya user ", user);
          this.messageService.setSpinner(false);
        }, 
        (error) => {
          this.messageService.setSpinner(false);
          console.log("Error updating user: ", error);
        })
    }
  }

}


