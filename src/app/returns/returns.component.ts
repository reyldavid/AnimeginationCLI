import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.css']
})
export class ReturnsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  newNote() {
    this.router.navigate(['/user-note']);
  }

}
