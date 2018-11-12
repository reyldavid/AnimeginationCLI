import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiProduct } from '../models/product';
import { ListType } from '../models/listtype';
import { EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListingService } from '../services/listings.service';
import { ListTypeService } from '../services/listtypes.service';
declare var $: any;

@Component({
  selector: 'app-product-slide',
  templateUrl: './product-slide.component.html',
  styleUrls: ['./product-slide.component.css']
})
export class ProductSlideComponent implements OnInit {

  @Input()
  listTypeID: number;

  @Input()
  productID: number;

  @Input()
  bgc: boolean;

  @Output() 
  productSelected: EventEmitter<ApiProduct> = new EventEmitter<ApiProduct>();

  showButtons: boolean = false;
  outerWidth: number = 0;

  listTypeIDparam: string;
  listType: ListType = { "ListTypeID": 0, "ListTypeName": "", "Description": "" };
  productIDparam: string;

  public apiProducts: ApiProduct[];

  constructor(private _router: Router, private _route: ActivatedRoute, 
              private _listingService: ListingService, 
              private _listTypeService: ListTypeService) { 
                console.log('product slider construct');
  }

  OnSelectProduct(product: ApiProduct) {
      console.log('product slide product ID: ' + product.ProductID);
      this._router.navigate(['/detail', { productID: product.ProductID }]);
  }

  GetProductsSlideByType(listTypeID: number) {
      this._listingService.getAnimeListing(listTypeID)
          .subscribe((apiProducts: ApiProduct[]) => {
            this.apiProducts = apiProducts;
            this.showButtons = true;

            this.GetProductListType(this.listTypeID);
          });
  }

  GetProductsSlideByID(listTypeID: number) {
    this._listingService.getAnimeListing(listTypeID)
        .subscribe((apiProducts: ApiProduct[]) => {
          this.apiProducts = apiProducts;
          this.showButtons = true;

          this.GetProductListType(this.listTypeID);
        });
  }

  GetProductListType(listTypeID: number) {
        this._listTypeService.getAnimeListType(listTypeID)
            .subscribe((listType: ListType) => {
                this.listType = listType;

                this.SetupListeners();
              });
  }

  ngOnInit(): any {
      console.log('product slide init');
      this._route.paramMap.subscribe(params => {
        this.listTypeIDparam = params.get('listTypeID');
        this.productIDparam = params.get('productID');
        console.log('aya productID');
        console.log(this.productIDparam);

        if (this.listTypeID) {
          this.GetProductsSlideByType(this.listTypeID);
        }
        else {
          if (this.listTypeIDparam) {
            this.listTypeID = Number(this.listTypeIDparam);
            this.GetProductsSlideByType(this.listTypeID);
          }
          else {
            if (this.productID) {
              this.GetProductsSlideByID(this.productID);
            }
            else if (this.productIDparam) {
              this.productID = Number(this.productIDparam);
              this.GetProductsSlideByID(this.productID);
            }
          }
        }
      })
  }

  SetupListeners() {
    var _this = this;

    // PREVIOUS BUTTON
    var slidePrev = document.getElementById("prev" + this.listTypeID);
    slidePrev.classList.add(this.listType.ListTypeName);

    let buttonPrevId = ".slide-prev".concat(".", this.listType.ListTypeName);
    console.log(buttonPrevId);

    $(buttonPrevId).on('click', function() {

      // var _this = this;
      let wrapperId = "#wrap".concat(_this.listTypeID.toString(), ".slide-wrapper ul");

      let scrollPosition = $(wrapperId).scrollLeft();
      console.log('aya prev');
      console.log(scrollPosition);

      if (scrollPosition == 0 && _this.outerWidth > 0) {

        $(wrapperId).animate({
          scrollLeft: _this.outerWidth
        }, 500, 'swing');
      }
      else {
        $(wrapperId).animate({
          scrollLeft: '-=200'
        }, 300, 'swing');
      }

      if (scrollPosition > _this.outerWidth) {
        _this.outerWidth = scrollPosition;
      }

    });

    // NEXT BUTTON
    var slideNext = document.getElementById("next" + this.listTypeID);
    slideNext.classList.add(this.listType.ListTypeName);

    let buttonNextId = ".slide-next".concat(".", this.listType.ListTypeName);
    console.log(buttonNextId);

    $(buttonNextId).on('click', function() {

      // var _this = this;
      let wrapperId = "#wrap".concat(_this.listTypeID.toString(), ".slide-wrapper ul");

      // let scrollPosition = $('#wrap5.slide-wrapper ul').scrollLeft();
      let scrollPosition = $(wrapperId).scrollLeft();
      console.log('aya next');
      console.log(scrollPosition);

      let remainder = scrollPosition % 200;
      if (scrollPosition > 0 && scrollPosition == _this.outerWidth && remainder > 0) {

        $(wrapperId).animate({
          scrollLeft: '0'
        }, 500, 'swing');
      }
      else {
        $(wrapperId).animate({
          scrollLeft: '+=200'
        }, 300, 'swing');
      }

      if (scrollPosition > _this.outerWidth) {
        _this.outerWidth = scrollPosition;
      }
    });        

    $(window).resize(function() {
      _this.outerWidth = 0;
    })
  }

}
