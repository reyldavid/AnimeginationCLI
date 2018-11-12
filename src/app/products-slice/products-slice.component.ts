import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiProduct } from '../models/product';
import { ListType } from '../models/listtype';
import { EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListingService } from '../services/listings.service';
import { ListTypeService } from '../services/listtypes.service';
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
                private _listTypeService: ListTypeService) { 
                  console.log('product slice construct');
    }

    OnSelectProduct(product: ApiProduct) {
        //this.currentProduct = product;
        //this.productSelected.emit(product);
        console.log('product slice product ID: ' + product.ProductID);
        this._router.navigate(['/detail', { productID: product.ProductID }]);
    }

    GetProductsSlice(listTypeID: number) {
        this._listingService.getAnimeListing(listTypeID)
            .subscribe((apiProducts: ApiProduct[]) => 
                // this.apiProducts = apiProducts.slice(0, 14));
                this.apiProducts = apiProducts);
    }

    GetSliceList(listTypeID: number) {
        this._listingService.getAnimeListing(listTypeID)
            .subscribe((apiProducts: ApiProduct[]) => this.apiProducts = apiProducts);
    }

    GetProductListType(listTypeID: number) {
        this._listTypeService.getAnimeListType(listTypeID)
            .subscribe((listType: ListType) => {
                this.listType = listType;
            });
    }

    ngOnInit(): any {
        console.log('product slice init');
        this._route.paramMap.subscribe(params => {
          this.listTypeIDparam = params.get('listTypeID');

          if (this.listTypeID === undefined) {
              this.listTypeID = Number(this.listTypeIDparam);
              this.GetSliceList(this.listTypeID);
          }
          else {
              this.GetProductsSlice(this.listTypeID);
          }
        })
        this.GetProductListType(this.listTypeID);
    }
}
