import { Component, OnInit, Input } from '@angular/core';
import { Employment } from '../models/employment';

@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.css']
})
export class EmploymentComponent implements OnInit {

  employment: Employment;
  details: string[] = [];

  @Input() set experience(employment: Employment) {
    this.employment = employment;
    this.details = employment.Details;
    console.log("employment ", employment);
  }

  constructor() { }

  ngOnInit() {
  }

}
