import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-footer-product',
  templateUrl: './footer-product.component.html',
  styleUrls: ['./footer-product.component.css']
})
export class FooterProductComponent implements OnInit {

  constructor(private messageService: MessageService ) {

   }

  ngOnInit() {
    this.messageService.selectFooter(false);
  }

}
