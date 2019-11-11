import { Component, OnInit } from '@angular/core';
import { FeedService } from '../services/feed.service';
import { FeedEntry } from '../models/feedEntry';
import { Globals } from '../globals';
import { MessageService } from '../services/message.service';
// import './rxjs-operators';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  feeds: Array<FeedEntry> = [];

  constructor (
    private globals: Globals,
    private messageService: MessageService,
    private feedService: FeedService) {
  }

  ngOnInit() {
    this.refreshFeed();
  }

  refreshFeed() {
    this.feeds.length = 0;
    let url = this.globals.rssFeedUrl;
    // Adds 1s of delay to provide user's feedback.
    this.feedService.getFeedContent(url).delay(1000)
        .subscribe(
            feed => {
              this.feeds = feed.items
              this.messageService.setSpinner(false);
            },
            error => {
              console.log("Error reading RSS feeds: ", error)
              this.messageService.setSpinner(false);
        });
  }

}