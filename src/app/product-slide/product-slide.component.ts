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
  selector: 'app-product-slide',
  templateUrl: './product-slide.component.html',
  styleUrls: ['./product-slide.component.css']
})
export class ProductSlideComponent implements OnInit {

  @Input()
  listTypeID: number;

  @Input()
  bgc: boolean;

  @Output() 
  productSelected: EventEmitter<ApiProduct> = new EventEmitter<ApiProduct>();

  showButtons: boolean = false;
  outerWidth: number = 0;

  listTypeIDparam: string;
  listType: ListType = { "ListTypeID": 0, "ListTypeName": "", "Description": "" };

  public apiProducts: ApiProduct[];

  constructor(private _router: Router, private _route: ActivatedRoute, 
              private _listingService: ListingService, 
              private _listTypeService: ListTypeService, 
              private _cartService: CartService, 
              private _messageService: MessageService ) { 
  }

  OnSelectProduct(product: ApiProduct) {
      // this._router.navigate(['/detail'], { queryParams: {  productID: product.ProductID } });
      this._cartService.addVisitHistory(product.ProductID).subscribe(item => {
      })
  }

  GetProductsSlideByType(listTypeID: number) {
      this._listingService.getAnimeListing(listTypeID)
          .subscribe((apiProducts: ApiProduct[]) => {
            this.apiProducts = apiProducts;
            this.showButtons = true;

            this.GetProductListType(listTypeID);
          });
  }

  GetProductListType(listTypeID: number) {
      var __this = this;
      this._listTypeService.getAnimeListType(listTypeID)
          .subscribe((listType: ListType) => {
              this.listType = listType;

              // this.SetupListeners();
              setTimeout(function() {
                __this.SetupListeners();
              }, 1400);
  
              this._messageService.setSpinner(false);
          });
  }

  ngOnInit(): any {
      this._route.paramMap.subscribe(params => {
        this.listTypeIDparam = params.get('listTypeID');

        if (this.listTypeID) {
          let typeID = this.listTypeID % 10;
          this.GetProductsSlideByType(typeID);
        }
        else {
          if (this.listTypeIDparam) {
            this.listTypeID = Number(this.listTypeIDparam);
            let typeID = this.listTypeID % 10;
            this.GetProductsSlideByType(typeID);
          }
        }
      })
  }

  SetupListeners() {
    var _this = this;

    // PREVIOUS BUTTON
    var slidePrev = document.getElementById("prev" + this.listTypeID);
    if (!slidePrev) {
      return;
    }
    slidePrev.classList.add(this.listType.ListTypeName);

    let buttonPrevId = ".slide-prev".concat(".", this.listType.ListTypeName);

    $(buttonPrevId).on('click', function() {

      // var _this = this;
      let wrapperId = "#wrap".concat(_this.listTypeID.toString(), ".slide-wrapper ul");

      let scrollPosition = $(wrapperId).scrollLeft();

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

    $(buttonNextId).on('click', function() {

      // var _this = this;
      let wrapperId = "#wrap".concat(_this.listTypeID.toString(), ".slide-wrapper ul");

      // let scrollPosition = $('#wrap5.slide-wrapper ul').scrollLeft();
      let scrollPosition = $(wrapperId).scrollLeft();

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
