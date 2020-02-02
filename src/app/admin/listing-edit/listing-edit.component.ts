import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePickerComponent, IDatePickerConfig } from 'ng2-date-picker';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { MessageService } from '../../services/message.service';
import { ListingService } from '../../services/listings.service';
import { Listing, ListingModel } from '../../models/listing';
import { ListTypeService } from '../../services/listtypes.service';
import { ListType } from '../../models/listtype';
import { ListingType } from '../../models/listingTypes';
import { ProductsService } from '../../services/products.service';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Product, ApiProduct } from 'src/app/models/product';
import { UtilityService } from '../../services/utilities.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-listing-edit',
  templateUrl: './listing-edit.component.html',
  styleUrls: ['./listing-edit.component.css']
})
export class ListingEditComponent implements OnInit {

  listing: ListingModel = {
    ListingID: 0,
    ListTypeID: 2, 
    Rank: 1, 
    ProductID: 0,
    Effective: "",
    Expiration: "",
    Created: ""
  }
  listingID: number = 0;
  product: ApiProduct;
  submitted: boolean = false;
  listTypes: ListType[] = [];
  products: ApiProduct[] = [];
  listingSubscription: Subscription;
  dateEffective: any;
  dateExpiration: any;
  datePickerConfig = <IDatePickerConfig>{
    locale: "en",
    format: "MMMM DD, YYYY"
  }

  constructor(private listingService: ListingService, 
            private sessionService: SessionService, 
            private messageService: MessageService, 
            private route: ActivatedRoute,
            private productsService: ProductsService,
            private listTypeService: ListTypeService,
            private helper: UtilityService ) { }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let listingIDparam = params.get('listingID');

      if (listingIDparam) {
        this.listingID = parseInt(listingIDparam);
      }
    })

    this.route.queryParams.subscribe(params => {
        this.listingID = parseInt(params.listingID);
        if (this.listingID) {
        // this.getListing();
      }
    })

    this.listTypeService.getAnimeListTypes().subscribe(listTypes => {
      this.listTypes = listTypes;
      this.listTypeService.setListTypesCache(listTypes);

      this.productsService.getAnimeProducts().subscribe(products => {
        this.products = products;
        this.productsService.setProductsCache(products);

        let __this = this;
        this.listingSubscription = this.listingService
            .getAnimeListings().subscribe(listings => {
              let listing = _.find(listings, function(item) {
                return item.ListingID == __this.listingID;
              } ) 
              __this.listing.ListingID = listing.ListingID;
              __this.listing.ListTypeID = listing.ListingTypeID;
              __this.listing.ProductID = listing.ProductID;
              __this.listing.Rank = listing.Rank;
              __this.listing.Effective = this.helper.formatCalendarDate(listing.EffectiveDate);
              __this.listing.Expiration = this.helper.formatCalendarDate(listing.Expiration);

              __this.product = _.find(__this.products, function(item) {
                return item.ProductID == __this.listing.ProductID;
              })
              __this.messageService.setSpinner(false);
            })
        this.listingSubscription.unsubscribe();
      });
    });
  }

  // selectListType(listTypeId: number) {
  //   this.listing.ListTypeID = listTypeId;
  // }
  // selectProduct(productId: number) {
  //   this.listing.ProductID = productId;
  // }

  // onEffectiveDateChange(newDate) {
  //   this.dateEffective = newDate.toISOString();
  //   this.listing.Effective = this.dateEffective;
  // }

  onSubmit() {
    this.submitted = true;
    // this.listing.Effective = this.dateEffective;
    // this.listing.Expiration = this.dateExpiration;

    if (this.sessionService.isAuthenticated()) {
      let token = this.sessionService.UserToken;

      this.listingService.editListing(token, this.listing)
        .subscribe(listing => {
          this.messageService.setSpinner(false);
        }, 
        (error) => {
          this.messageService.setSpinner(false);
          console.log("Error updating listing: ", error);
      })
    }
  }

}
