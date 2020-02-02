import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ApiProduct } from '../../models/product';
import { OrderItem } from '../../models/orderItemModel';
import { ProductsService } from '../../services/products.service';
import { MessageService } from '../../services/message.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  @Input() set orderItem(orderItem: OrderItem) {
    this.GetProduct(orderItem);
    this.quantity = orderItem.Quantity;
  }

  product: ApiProduct;
  quantity: number;
  show: boolean = false;

  constructor( private router: Router, 
    private productService: ProductsService, 
    private cartService: CartService, 
    private messageService: MessageService ) { 
  }

  ngOnInit() {
  }

  GetProduct(orderItem: OrderItem) {
    this.productService.getAnimeProduct(orderItem.ProductID)
      .subscribe(((product: ApiProduct) => 
        {
          this.product = product;
          this.show = true;

          this.messageService.setSpinner(false);
        }
    ));
  }

  OnSelectProduct() {
    // this.router.navigate(['/detail'], { queryParams: {  productID: this.product.ProductID } });
    this.cartService.addVisitHistory(this.product.ProductID).subscribe(item => {
    })
  }

  BuyAgain(product: Product) {
    // this.router.navigate(['/detail'], { queryParams: {  productID: this.product.ProductID } });
    this.cartService.addVisitHistory(this.product.ProductID).subscribe(item => {
    })
  }

  WriteReview(product: Product) {
    this.router.navigate(['/product-review'], { queryParams: {  productID: this.product.ProductID } });
  }
}
