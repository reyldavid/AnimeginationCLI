import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medium } from '../../models/medium';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { MediaService } from '../../services/media.service';
import { MessageService } from '../../services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-medium-edit',
  templateUrl: './medium-edit.component.html',
  styleUrls: ['./medium-edit.component.css']
})
export class MediumEditComponent implements OnInit {

  mediumModel: Medium = { MediumID: 0, MediumName: "", Description: "" };
  submitted: boolean = false;
  mediumID: number;
  mediaSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private mediaService: MediaService, 
              private sessionService: SessionService, 
              private messageService: MessageService) { 
              }

  ngOnInit() {
    console.log('medium edit init');
    this.route.paramMap.subscribe(params => {
      let mediumIDparam = Number(params.get('mediumID'));

      if (mediumIDparam) {
        this.mediumID = mediumIDparam;
        // this.getMedium();
      }
    })

    this.route.queryParams.subscribe(params => {
        this.mediumID = params.mediumID;

        if (this.mediumID) {
          // this.getMedium();
        }
    })
    this.mediaSubscription = this.mediaService.getMediaTypeById(this.mediumID).subscribe(item => {
      this.mediumModel = item;
    })
  }

  ngOnDestroy() {
    this.mediaSubscription.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;

    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;

      this.mediaService.updateMedium(token, this.mediumModel)
        .subscribe(medium => {
          console.log("aya medium ", medium);
          this.messageService.setSpinner(false);
        }, 
        (error) => {
          this.messageService.setSpinner(false);
          console.log("Error updating medium: ", error);
        })
    }
  }

}
