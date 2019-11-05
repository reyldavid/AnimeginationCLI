import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ApiProduct, Product } from '../../models/product';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  products: ApiProduct[] = [];

  constructor( private router: Router,
               private productsService: ProductsService,  
               private sessionService: SessionService, 
               private messageService: MessageService ) { }

  ngOnInit() {
    this.productsService.getAnimeProducts().subscribe(products => {
      this.products = products;
      this.productsService.setProductsCache(products);
      this.messageService.setSpinner(false);
    })
  }

  OnEditProduct(product: ApiProduct) {
    console.log('product ID: ' + product.ProductID);
    this.router.navigate(['/product-edit'], { queryParams: {  productID: product.ProductID } });
  }

  OnDeleteProduct(product: ApiProduct) {
    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;

      this.productsService.deleteProduct(token, product.ProductID).subscribe(item => {
        this.messageService.setSpinner(false);
        console.log("aya deleted product ", item);
        this.router.navigate(['/product-info']);
      })
    }
  }

}

