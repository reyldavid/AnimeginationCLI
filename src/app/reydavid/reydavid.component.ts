import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recommendation } from '../models/recommendation';
import { RecommendsService } from '../services/recommend.service';
import { EmploymentService } from '../services/employment.service';
import { Employment } from '../models/employment';

@Component({
  selector: 'app-reydavid',
  templateUrl: './reydavid.component.html',
  styleUrls: ['./reydavid.component.css']
})
export class ReydavidComponent implements OnInit {

  recommends: Recommendation[] = [];
  employments: Employment[] = [];
  educations: Employment[] = [];
  ratingsCount: number = 0;
  ratingsAverage: number = 0;
  coverIntro: string;

  constructor( private router: Router,
      private recommendsService: RecommendsService,
      private employmentService: EmploymentService ) { }

  ngOnInit() {
    this.recommendsService.getRecommends().subscribe(recommends => {
      this.recommends = recommends;
      this.recommendsService.setRecommendsCache(recommends);
      this.ratingsCount = recommends.length;
      this.ratingsAverage = 4.94;
    })

    this.employments = this.employmentService.Employments;
    this.educations = this.employmentService.Educations;
    this.coverIntro = this.employmentService.CoverIntro;
  }

  AddToCart() {

  }

  WriteReview() {
    // window.open("https://www.linkedin.com/in/reyldavid/");
    this.router.navigate(['/user-note']);
  }

}
