import { Component, OnInit, OnDestroy } from '@angular/core';
import { Publisher } from '../../models/publisher';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { PublishersService } from '../../services/publishers.service';
import { MessageService } from '../../services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-publisher-edit',
  templateUrl: './publisher-edit.component.html',
  styleUrls: ['./publisher-edit.component.css']
})
export class PublisherEditComponent implements OnInit {

  publisherModel: Publisher = { PublisherID: 0, PublisherName: "", Description: "" };
  submitted: boolean = false;
  publisherID: number;
  publishersSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private publishersService: PublishersService, 
              private sessionService: SessionService, 
              private messageService: MessageService) { 
              }

  ngOnInit() {
    console.log('publisher edit init');
    this.route.paramMap.subscribe(params => {
      let publisherIDparam = Number(params.get('publisherID'));

      if (publisherIDparam) {
        this.publisherID = publisherIDparam;
        // this.getPublisher();
      }
    })

    this.route.queryParams.subscribe(params => {
        this.publisherID = params.publisherID;

        if (this.publisherID) {
          // this.getPublisher();
        }
    })
    this.publishersSubscription = this.publishersService.getPublisherById(this.publisherID).subscribe(item => {
      this.publisherModel = item;
    })
  }

  ngOnDestroy() {
    this.publishersSubscription.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;

    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;

      this.publishersService.updatePublisher(token, this.publisherModel)
        .subscribe(publisher => {
          console.log("aya publisher ", publisher);
          this.messageService.setSpinner(false);
        }, 
        (error) => {
          this.messageService.setSpinner(false);
          console.log("Error updating publisher: ", error);
        })
    }
  }

}
