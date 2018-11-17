import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiProduct } from '../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    @Input()
    productID: number;

    product: ApiProduct;

    constructor(private _router: Router, private _route: ActivatedRoute, 
                private _productService: ProductsService) { 
                  console.log('product details construct');
    }

    GetProduct(productID: number) {
        this._productService.getAnimeProduct(productID)
            .subscribe((product: ApiProduct) => 
            {
                this.product = product
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
}
