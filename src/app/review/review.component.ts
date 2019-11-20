import { Component, OnInit, Input } from '@angular/core';
import { Recommendation } from '../models/recommendation';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  recommendation: Recommendation;

  @Input() set review(review: Recommendation) {
    this.recommendation = review;
    console.log("recommendation ", review);
  }

  constructor() { }

  ngOnInit() {
  }

}
