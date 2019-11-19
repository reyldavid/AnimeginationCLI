import { Component, OnInit } from '@angular/core';
import { DatePickerComponent, IDatePickerConfig } from 'ng2-date-picker';
import { Recommendation } from '../../models/recommendation';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { RecommendsService } from '../../services/recommend.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-recommend-add',
  templateUrl: './recommend-add.component.html',
  styleUrls: ['./recommend-add.component.css']
})
export class RecommendAddComponent implements OnInit {

  recommendModel: Recommendation = { 
    recommendId: 0,
    ratingId: 5,
    title: "",
    recommendation: "",
    reviewer: "",
    reviewerEmployer: "",
    employerUrl: "",
    created: ""
  };
  submitted: boolean = false;
  reviewDate: any;
  datePickerConfig = <IDatePickerConfig>{
    locale: "en",
    format: "MMMM DD, YYYY"
  }

  constructor(private recommendsService: RecommendsService, 
              private sessionService: SessionService, 
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.recommendModel.created = this.reviewDate;

    if (this.sessionService.isAuthenticated()) {
      let token = this.sessionService.UserToken;

      this.recommendsService.addRecommend(token, this.recommendModel)
        .subscribe(recommend => {
          console.log("aya new recommend ", recommend);
          this.messageService.setSpinner(false);
        }, 
        (error) => {
          this.messageService.setSpinner(false);
          console.log("Error creating recommend: ", error);
      })
    }
  }

}
