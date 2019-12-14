import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiProduct } from '../models/product';
import { ListType } from '../models/listtype';
import { EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListingService } from '../services/listings.service';
import { ListTypeService } from '../services/listtypes.service';
import { MessageService } from '../services/message.service';
import { CartService } from '../services/cart.service';
declare var $: any;

@Component({
  selector: 'app-products-slice',
  templateUrl: './products-slice.component.html',
  styleUrls: ['./products-slice.component.css']
})
export class ProductsSliceComponent implements OnInit {

  @Input()
  listTypeID: number;

  @Output() 
  productSelected: EventEmitter<ApiProduct> = new EventEmitter<ApiProduct>();

    listTypeIDparam: string;
    listType: ListType = { "ListTypeID": 0, "ListTypeName": "", "Description": "" };
    public apiProducts: ApiProduct[];
    public currentProduct: ApiProduct = null;

    constructor(private _router: Router, private _route: ActivatedRoute, 
                private _listingService: ListingService, 
                private _listTypeService: ListTypeService,
                private _cartService: CartService,  
                private _messageService: MessageService ) { 
                  console.log('product slice construct');
    }

    OnSelectProduct(product: ApiProduct) {
        //this.currentProduct = product;
        //this.productSelected.emit(product);
        console.log('product slice product ID: ' + product.ProductID);
        // this._router.navigate(['/detail', { productID: product.ProductID }]);
        this._cartService.addVisitHistory(product.ProductID).subscribe(item => {
            console.log(item);
        })
    }

    GetProductsSlice(listTypeID: number) {
        this._listingService.getAnimeListing(listTypeID)
            .subscribe((apiProducts: ApiProduct[]) => {
                // this.apiProducts = apiProducts.slice(0, 14));
                this.apiProducts = apiProducts;

                this._messageService.setSpinner(false);
            })
    }

    GetSliceList(listTypeID: number) {
        this._listingService.getAnimeListing(listTypeID)
            .subscribe((apiProducts: ApiProduct[]) => {
                this.apiProducts = apiProducts;

                this._messageService.setSpinner(false);
            }) 
    }

    GetProductListType(listTypeID: number) {
        this._listTypeService.getAnimeListType(listTypeID)
            .subscribe((listType: ListType) => {
                this.listType = listType;

                this.GetSliceList(this.listTypeID);
            });
    }

    ngOnInit(): any {
        console.log('product slice init');
        this._route.paramMap.subscribe(params => {
          this.listTypeIDparam = params.get('listTypeID');

        //   if (this.listTypeID === undefined || isNaN(this.listTypeID)) {
        //       this.listTypeID = Number(this.listTypeIDparam);
        //       this.GetSliceList(this.listTypeID);
        //   }
        //   else {
        //       this.GetProductsSlice(this.listTypeID);
        //   }
            if (this.listTypeIDparam) {
              this.listTypeID = Number(this.listTypeIDparam);
              this.GetProductListType(this.listTypeID);
            }
        })
        // this.GetProductListType(this.listTypeID);

        // this._route.queryParams.subscribe(params => {
        //     if (params.listTypeId) {
        //         this.listTypeID = params.listTypeId;
      
        //         console.log('aya listTypeId');
        //         console.log(this.listTypeID);
          
        //         this.GetProductListType(this.listTypeID);
        //         }
        // })      
    }
}
