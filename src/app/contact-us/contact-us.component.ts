import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private router: Router) { 
      console.log('contact us construct');
}

  ngOnInit() {
  }

  shopping() {
    this.router.navigate(['/genres']);
  }
  
  newNote() {
    this.router.navigate(['/user-note']);
  }

  login() {
    this.router.navigate(['/login']);
  }

}
