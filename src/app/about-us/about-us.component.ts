import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private router: Router) { 
    console.log('about us construct');
}

  ngOnInit() {
  }

  reydavid() {
    this.router.navigate(['/reydavid']);
  }
}

  // console.log('about init');
  // console.log('about href ' + window.location.href);
  // console.log('about path ' + window.location.pathname);  
