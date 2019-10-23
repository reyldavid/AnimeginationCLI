import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';
import { Medium } from '../models/medium';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { TokenModel } from '../models/tokenmodel';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-medium',
  templateUrl: './medium.component.html',
  styleUrls: ['./medium.component.css']
})
export class MediumComponent implements OnInit {

  media: Medium[] = [];

  constructor( private router: Router,
               private mediaService: MediaService, 
               private sessionService: SessionService, 
               private messageService: MessageService ) { }

  ngOnInit() {
    this.mediaService.getMediaTypes().subscribe(media => {
      this.media = media;
      this.mediaService.setMediaCache(media);
    })
  }

  OnEditMedium(medium: Medium) {
    console.log('medium ID: ' + medium.MediumID);
    this.router.navigate(['/medium-edit'], { queryParams: {  mediumID: medium.MediumID } });
  }

  OnDeleteMedium(medium: Medium) {
    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;

      this.mediaService.deleteMedium(token, medium).subscribe(item => {
        this.messageService.setSpinner(false);
        console.log("aya deleted medium ", item);
      })
    }
  }

}

