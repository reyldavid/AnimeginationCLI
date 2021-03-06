import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiProduct } from '../models/product';
import { ListType } from '../models/listtype';
import { ListingService } from '../services/listings.service';
import { ListTypeService } from '../services/listtypes.service';
import { MessageService } from '../services/message.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: ApiProduct[];
  listType: ListType;
  title: string;

  constructor(private _router: Router, 
      private _route: ActivatedRoute, 
      private _listingService: ListingService, 
      private _listTypeService: ListTypeService, 
      private _cartService: CartService,  
      private _messageService: MessageService ) {
   }

  ngOnInit(): any {
    this._route.queryParams.subscribe(params => {
      let listTypeId = params.listTypeId % 10;

      this.GetProductListType(listTypeId);
      // this.GetProducts(listTypeId);
    })

    this._route.paramMap.subscribe(params => {
      let listTypeIdparam = params.get('listTypeID');
  
      if (listTypeIdparam) {
        let typeID = Number(listTypeIdparam) % 10;

        this.GetProductListType(typeID);
        // this.GetProducts(typeID);
      }
    })
  }
  
  GetProducts(listTypeId: number) {
    this._listingService.getAnimeListing(listTypeId)
        .subscribe((apiProducts: ApiProduct[]) => {
          this.products = apiProducts;
  
          this._messageService.setSpinner(false);
        });
  }

  GetProductListType(listTypeId: number) {
    this._listTypeService.getAnimeListType(listTypeId)
        .subscribe((listType: ListType) => {
          this.listType = listType;
          this.title = listType.Description;

          this.GetProducts(listType.ListTypeID);
        });
  }
  
  OnSelectProduct(product: ApiProduct) {
    // this._router.navigate(['/detail'], { queryParams: { productID: product.ProductID } });
    this._cartService.addVisitHistory(product.ProductID).subscribe(item => {
    })
  }

}

