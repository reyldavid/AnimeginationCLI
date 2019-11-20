import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recommendation } from '../models/recommendation';
import { RecommendsService } from '../services/recommend.service';

@Component({
  selector: 'app-reydavid',
  templateUrl: './reydavid.component.html',
  styleUrls: ['./reydavid.component.css']
})
export class ReydavidComponent implements OnInit {

  description: string = "A ".concat("highly accomplished Senior Software Engineer ",
      "/ Software Architect with thirty (30) years of results-driven experience, ",
      "with particular expertise in Angular, C#, Asp.Net Web API, ",
      "SQL Server and Oracle, Asp.Net MVC, TypeScript, Windows 8 App development, ",
      "and extensive work experience with Microsoft Azure, AWS, Google Cloud, ",
      "the .NET Framework, the Entity Framework, jQuery, Docker, and high proficiency ", 
      "in Hybrid Mobile App development, seeking a challenging opportunity ",
      "that would utilize advanced technologies in a fast-paced environment");

  blog: string = "Visit ".concat("Rey David's Developers Blog at ",
      "<a href='http://davidsdotnetlines.blogspot.com' ",
      "target='_blank'>http://DavidsDotNetLines.BlogSpot.com</a> ",
      "for tips and tricks on Angular, Asp.Net, SQL Server, IIS and Https, ",
      "Windows 8 App development, and much more. ",
      "<a href='http://davidsdotnetlines.blogspot.com' ",
      "target='_blank'>Check it out now.</a> ");

  recommends: Recommendation[] = [];
  ratingsCount: number = 0;
  ratingsAverage: number = 0;

  constructor( private router: Router, 
      private recommendsService: RecommendsService ) { }

  ngOnInit() {
    console.log("aya blog ", this.blog);
    this.recommendsService.getRecommends().subscribe(recommends => {
      this.recommends = recommends;
      this.recommendsService.setRecommendsCache(recommends);
      this.ratingsCount = recommends.length;
      this.ratingsAverage = 4.94;
    })
  }

  AddToCart() {

  }

  WriteReview() {
    // window.open("https://www.linkedin.com/in/reyldavid/");
    this.router.navigate(['/user-note']);
  }

}
