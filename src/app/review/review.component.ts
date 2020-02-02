import { Component, OnInit, Input } from '@angular/core';
import { Recommendation } from '../models/recommendation';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  recommendation: Recommendation;
  helpful: boolean = false;
  notHelpful: boolean = false;
  thanks: boolean = false;

  @Input() set review(review: Recommendation) {
    this.recommendation = review;
  }

  constructor() { }

  ngOnInit() {
  }

  OnHelpful() {
    if (!this.notHelpful) {
      this.helpful = true;
    }
    this.thanks = true;
  }

  OnNotHelpful() {
    if (!this.helpful) {
      this.notHelpful = true;
    }
    this.thanks = true;
  }

}
