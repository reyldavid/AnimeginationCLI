import { Component, OnInit } from '@angular/core';
import { UserFeedbackModel } from '../../models/userFeedbackModel';
import { UserFeedback } from '../../models/userFeedback';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { MessageService } from '../../services/message.service';
import { UserFeedbackService } from '../../services/userFeedback.service';
import { UtilityService } from '../../services/utilities.service';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.css']
})
export class UserFeedbackComponent implements OnInit {

  feedbacks: UserFeedback[] = [];

  constructor( private router: Router,
               private feedbackService: UserFeedbackService, 
               private sessionService: SessionService, 
               private messageService: MessageService, 
               private helper: UtilityService ) { }

  ngOnInit() {
    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;

      this.feedbackService.getUserFeedbacks(token).subscribe(feedbacks => {
        this.feedbacks = feedbacks;
        this.messageService.setSpinner(false);
      })
    }
  }

  OnDeleteUserFeedback(feedback: UserFeedback) {
    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;

      this.feedbackService.deleteUserFeedback(token, feedback.feedbackId).subscribe(item => {
        this.messageService.setSpinner(false);
      }, 
      (error) => {
        this.messageService.setSpinner(false);
        console.log("Error deleting user Feedback: ", error);
      })
    }
  }

  SplitCamelCase(camelCase: string): string {
    let parsed = camelCase.replace(/([a-z])([A-Z])/g, "$1 $2");
    return parsed;
  }

}
