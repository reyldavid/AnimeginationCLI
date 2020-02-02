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
import { Product, ApiProduct } from 'src/app/models/product';
import * as _ from 'lodash';

@Component({
  selector: 'app-listing-add',
  templateUrl: './listing-add.component.html',
  styleUrls: ['./listing-add.component.css']
})
export class ListingAddComponent implements OnInit {

  @ViewChild('effectiveDatePicker') effDatePicker: DatePickerComponent;

  open() { 
    this.effDatePicker.api.open();
  }

  close() {
    this.effDatePicker.api.close();
  }

  listing: ListingModel = {
    ListingID: 0,
    ListTypeID: 2, 
    Rank: 1, 
    ProductID: 0,
    Effective: "",
    Expiration: "",
    Created: ""
  }
  submitted: boolean = false;
  listTypes: ListType[] = [];
  products: ApiProduct[] = [];
  dateEffective: any;
  dateExpiration: any;
  datePickerConfig = <IDatePickerConfig>{
    locale: "en",
    format: "MMMM DD, YYYY"
  }

  constructor(private listingService: ListingService, 
            private sessionService: SessionService, 
            private messageService: MessageService, 
            private productsService: ProductsService,
            private listTypeService: ListTypeService) { }
  
  ngOnInit() {
    this.listTypeService.getAnimeListTypes().subscribe(listTypes => {
      this.listTypes = listTypes;
      this.listTypeService.setListTypesCache(listTypes);
    })

    this.productsService.getAnimeProducts().subscribe(products => {
      this.products = products;
      this.productsService.setProductsCache(products);
      this.messageService.setSpinner(false);
    })
  }

  selectListType(listTypeId: number) {
    this.listing.ListTypeID = listTypeId;
  }
  selectProduct(productId: number) {
    this.listing.ProductID = productId;
  }

  onEffectiveDateChange(newDate) {
    this.dateEffective = newDate.toISOString();
    this.listing.Effective = this.dateEffective;
  }

  onSubmit() {
    this.submitted = true;
    this.listing.Effective = this.dateEffective;
    this.listing.Expiration = this.dateExpiration;

    if (this.sessionService.isAuthenticated()) {
      let token = this.sessionService.UserToken;

      this.listingService.addListing(token, this.listing)
        .subscribe(listing => {
          this.messageService.setSpinner(false);
        }, 
        (error) => {
          this.messageService.setSpinner(false);
          console.log("Error creating listing: ", error);
      })
    }
  }

}

