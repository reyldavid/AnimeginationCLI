import { Component, OnInit } from '@angular/core';
import { Publisher } from '../../models/publisher';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { PublishersService } from '../../services/publishers.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-publisher-add',
  templateUrl: './publisher-add.component.html',
  styleUrls: ['./publisher-add.component.css']
})
export class PublisherAddComponent implements OnInit {

  publisherModel: Publisher = { PublisherID: 0, PublisherName: "", Description: "" };
  submitted: boolean = false;

  constructor(private publishersService: PublishersService, 
              private sessionService: SessionService, 
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

    if (this.sessionService.isAuthenticated()) {
      let token = this.sessionService.UserToken;

      this.publishersService.addPublisher(token, this.publisherModel)
        .subscribe(publisher => {
          console.log("aya new publisher ", publisher);
          this.messageService.setSpinner(false);
        }, 
        (error) => {
          this.messageService.setSpinner(false);
          console.log("Error creating publisher: ", error);
      })
    }
  }

}
