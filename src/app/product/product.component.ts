import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ApiProduct } from '../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { MessageService } from '../services/message.service';
import { AddItem } from '../models/addItemModel';
import { CartType } from '../models/carttype';
import { CartService } from '../services/cart.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    @Input()
    productID: number;

    product: ApiProduct;
    quantity: number = 1;
    loaded: boolean = false;

    constructor(private _router: Router, private _route: ActivatedRoute, 
                private _productService: ProductsService, 
                private _messageService: MessageService, 
                private _cartServce: CartService, 
                private _sessionService: SessionService,
                private _cdr: ChangeDetectorRef ) { 
                  console.log('product details construct');
    }

    GetProduct(productID: number) {
        this._productService.getAnimeProduct(productID)
            .subscribe((product: ApiProduct) => 
            {
                this.product = product;

                this.loaded = true;
                this._cdr.detectChanges();
                
                window.scrollTo(0,0);
                this._messageService.setSpinner(false);
            });
    }

    ngOnInit(): any {
        console.log('product details init');
        this._route.paramMap.subscribe(params => {
          let productIDparam = Number(params.get('productID'));

          if (productIDparam) {
            this.GetProduct(productIDparam);
          }
        })

        this._route.queryParams.subscribe(params => {
            this.productID = params.productID;

            if (this.productID) {
                this.GetProduct(this.productID);
            }
        })
    }

    AddToCart(product: ApiProduct) {

      if (this._sessionService.isAuthenticated()) {
        let cartItem: AddItem = {
          orderType: CartType.shoppingCart, 
          productID: product.ProductID,
          quantity: this.quantity, 
          unitPrice: product.YourPrice
        }

        this._cartServce.addCartItem(this._sessionService.UserToken, cartItem).subscribe(item => {
          console.log(item);
          this._router.navigate(['/cart']);
        }, (error: string) => {
          console.log(error);
          this._router.navigate(['/cart']);
          this._messageService.setSpinner(false);
        })
      }
      else {
        this._router.navigate(['/login']);
      }
    }

    updateQuantity(quantity: number) {
      this.quantity = quantity;
    }

    WriteReview() {
      console.log('product ID: ', this.productID);
      this._router.navigate(['/product-review'], { queryParams: {  productID: this.productID } });
    }
}
