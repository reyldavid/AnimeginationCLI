import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.css']
})
export class ShippingInfoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  newNote() {
    this.router.navigate(['/user-note']);
  }

}
