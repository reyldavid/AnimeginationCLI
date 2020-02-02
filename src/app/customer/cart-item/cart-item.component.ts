import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { CartItem } from '../../models/cartItemModel';
import { MessageService } from '../../services/message.service';
import { SessionService } from '../../services/session.service';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../../services/orders.service';
import { CartType } from '../../models/carttype';
import { CartService } from '../../services/cart.service';
import { OrderItem } from '../../models/orderItemModel';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() 
  cartItem: Product;

  @Input()
  cartType: CartType;
  moveToType: CartType;
  orderItem: OrderItem;

  moveLabel: string = "";

  constructor( private router: Router, 
               private messageService: MessageService,
               private sessionService: SessionService,  
               private orderService: OrderService, 
               private cartService: CartService ) { 
    }

  ngOnInit() {
    switch(this.cartType) {
      case CartType.shoppingCart:
      {
        this.moveLabel = "Save for Later";
        this.moveToType = CartType.wishList;
        break;
      }
      case CartType.wishList:
      {
        this.moveLabel = "Move to Cart"
        this.moveToType = CartType.shoppingCart;
        break;
      }
      case CartType.orderHistory:
      {
        break;
      }
      case CartType.recentlyVisited:
      {
        break;
      }
      default:
      {
      }
    }
  }

  OnSelectProduct(cartItem: CartItem) {
    // this.router.navigate(['/detail'], { queryParams: {  productID: cartItem.productID } });
    this.cartService.addVisitHistory(cartItem.productID).subscribe(item => {
    })
  }

  updateQuantity(quantity: number, cartItem: CartItem) {

      this.orderService.getOrderItemById(this.sessionService.UserToken, cartItem.orderItemID)
        .subscribe( (orderItem: OrderItem) => {
          orderItem.Quantity = quantity;

          this.orderService.updateOrderItem(this.sessionService.UserToken, orderItem)
            .subscribe( response => {
              this.messageService.setCartItem(response);
            },  
            (error: string) => {
              console.log("Error with update ", error);
              this.messageService.setSpinner(false);
            });
      },  
      (error: string) => {
        console.log("Error with update ", error);
        this.messageService.setSpinner(false);
      });
    }
    
    deleteItem(cartItem) {

      this.orderService.deleteOrderItem(this.sessionService.UserToken, cartItem.orderItemID)
        .subscribe( orderItem => {
          this.messageService.setCartItem( orderItem );
        },  
        (error: string) => {
          console.log("Error with update ", error);
          this.messageService.setSpinner(false);
        })
    }

    moveItem(cartItem: CartItem) {

      this.orderService.moveOrderItem(this.sessionService.UserToken, 
        cartItem.orderItemID, this.moveToType)
          .subscribe( item => {
            this.messageService.setCartItem( item );
        },  
        (error: string) => {
          console.log("Error with update ", error);
          this.messageService.setCartItem(this.orderItem);
        })
    }  
}
