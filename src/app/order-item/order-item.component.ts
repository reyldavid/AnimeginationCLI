import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ApiProduct } from '../models/product';
import { OrderItem } from '../models/orderItemModel';
import { ProductsService } from '../services/products.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  @Input() set orderItem(orderItem: OrderItem) {
    console.log("order Item ", orderItem);
    this.GetProduct(orderItem);
    this.quantity = orderItem.Quantity;
  }

  product: ApiProduct;
  quantity: number;
  show: boolean = false;

  constructor( private router: Router, 
    private productService: ProductsService, 
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
    console.log('product ID: ' + this.product.ProductID);
    this.router.navigate(['/detail'], { queryParams: {  productID: this.product.ProductID } });
  }

  BuyAgain(product: Product) {
    console.log('product ID: ', product);
  }

  WriteReview(product: Product) {
    console.log('product ID: ', product);
  }
}
