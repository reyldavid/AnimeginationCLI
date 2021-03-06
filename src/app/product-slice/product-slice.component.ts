import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiProduct } from '../models/product';
import { ListType } from '../models/listtype';
import { EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListingService } from '../services/listings.service';
import { ListTypeService } from '../services/listtypes.service';
import { CartService } from '../services/cart.service';
declare var $: any;

@Component({
  selector: 'app-product-slice',
  templateUrl: './product-slice.component.html',
  styleUrls: ['./product-slice.component.css']
})
export class ProductSliceComponent implements OnInit {

    @Input()
    listTypeID: number;

    listTypeIDparam: string;
    apiProducts: ApiProduct[];
    listType: ListType = { "ListTypeID": 0, "ListTypeName": "", "Description": "" };

    constructor(private _router: Router, private _route: ActivatedRoute, 
                private _listingService: ListingService, 
                private _listTypeService: ListTypeService, 
                private _cartService: CartService ) { 
    }

    OnSelectProduct(product: ApiProduct) {
        // this._router.navigate(['/detail', { productID: product.ProductID }]);
        this._cartService.addVisitHistory(product.ProductID).subscribe(item => {
        })
    }

    GetProductSlice(listTypeID: number) {
        this._listingService.getAnimeListing(listTypeID)
            .subscribe((apiProducts: ApiProduct[]) => 
            {
                this.apiProducts = apiProducts.slice(0, 1)

                this.GetProductListType(listTypeID);
            });
    }

    GetProductListType(listTypeID: number) {
        this._listTypeService.getAnimeListType(listTypeID)
            .subscribe((listType: ListType) => {
                this.listType = listType;
            });
    }

    ngOnInit(): any {
        this._route.paramMap.subscribe(params => {
            this.listTypeIDparam = params.get('listTypeID');

            if (this.listTypeID === undefined) {
                this.listTypeID = Number(this.listTypeIDparam);
            }
            this.GetProductSlice(this.listTypeID);
        })
    }
}
