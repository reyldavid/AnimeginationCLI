import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  @Output() rating: EventEmitter<number> = new EventEmitter();

  userRating: string;

  constructor() { }

  ngOnInit() {
  }

  sendRating(rating: number) {
    this.rating.emit(rating);
  }

}
