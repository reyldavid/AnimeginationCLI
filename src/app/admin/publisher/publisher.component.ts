import { Component, OnInit } from '@angular/core';
import { PublishersService } from '../../services/publishers.service';
import { Publisher } from '../../models/publisher';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {

  publishers: Publisher[] = [];

  constructor( private router: Router,
               private publishersService: PublishersService, 
               private sessionService: SessionService, 
               private messageService: MessageService ) { }

  ngOnInit() {
    this.publishersService.getPublishers().subscribe(publishers => {
      this.publishers = publishers;
      this.publishersService.setPublishersCache(publishers);
    })
  }

  OnEditPublisher(publisher: Publisher) {
    this.router.navigate(['/publisher-edit'], { queryParams: {  publisherID: publisher.PublisherID } });
  }

  OnDeletePublisher(publisher: Publisher) {
    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;

      this.publishersService.deletePublisher(token, publisher).subscribe(item => {
        this.messageService.setSpinner(false);
      })
    }
  }

}

