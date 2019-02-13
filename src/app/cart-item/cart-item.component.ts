import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { CartItem } from '../models/cartItemModel';
import { MessageService } from '../services/message.service';
import { SessionService } from '../services/session.service';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../services/orders.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() 
  cartItem: Product;

  constructor( private router: Router, 
               private route: ActivatedRoute, 
               private messageService: MessageService,
               private sessionService: SessionService,  
               private orderService: OrderService ) { 
    }

  ngOnInit() {
  }

  OnSelectProduct(cartItem: CartItem) {
    console.log('product slide product ID: ' + cartItem.productID);
    // this.router.navigate(['/detail', { productID: cartItem.productID }]);
    this.router.navigate(['/detail'], { queryParams: {  productID: cartItem.productID } });
  }

  updateQuantity(quantity, cartItem) {
    console.log("aya " + quantity);
    console.log("ueto " + cartItem.orderID);

      this.orderService.getOrderItemById(this.sessionService.UserToken, cartItem.orderItemID)
        .subscribe( orderItem => {
          console.log('order item: ');
          orderItem.quantity = quantity;
          console.log(orderItem);

          this.orderService.updateOrderItem(this.sessionService.UserToken, orderItem)
            .subscribe( response => {
              console.log('updated response: ');
              console.log(response);

              this.messageService.setCartItem(response);
            },  
            (error: string) => {
              console.log(error);
              this.messageService.setSpinner(false);
            });
      },  
      (error: string) => {
        console.log(error);
        this.messageService.setSpinner(false);
      });
  }
  
}
