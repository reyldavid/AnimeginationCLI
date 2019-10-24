import { Component, OnInit } from '@angular/core';
import { Medium } from '../../models/medium';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { MediaService } from '../../services/media.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-medium-add',
  templateUrl: './medium-add.component.html',
  styleUrls: ['./medium-add.component.css']
})
export class MediumAddComponent implements OnInit {

  mediumModel: Medium = { MediumID: 0, MediumName: "", Description: "" };
  submitted: boolean = false;

  constructor(private mediaService: MediaService, 
              private sessionService: SessionService, 
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

    if (this.sessionService.isAuthenticated()) {
      let token = this.sessionService.UserToken;

      this.mediaService.addMedium(token, this.mediumModel)
        .subscribe(medium => {
          console.log("aya new medium ", medium);
          this.messageService.setSpinner(false);
        }, 
        (error) => {
          this.messageService.setSpinner(false);
          console.log("Error creating medium: ", error);
      })
    }
  }

}
