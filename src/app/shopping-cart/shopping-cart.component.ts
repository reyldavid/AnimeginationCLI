import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private messageService: MessageService) {

  }
  ngOnInit() {
    this.messageService.setSpinner(false);
  }
}
