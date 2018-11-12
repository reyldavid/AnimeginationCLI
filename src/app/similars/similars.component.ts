import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiProduct } from '../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { SimilarsService } from '../services/similars.service';
declare var $: any;

@Component({
  selector: 'app-similars',
  templateUrl: './similars.component.html',
  styleUrls: ['./similars.component.css']
})
export class SimilarsComponent implements OnInit {

  @Input()
  productID: number;

  @Input()
  bgc: boolean;

  title: string = "Customers Who Bought This Item Also Bought";

  showButtons: boolean = false;
  outerWidth: number = 0;

  productIDparam: string;

  public apiProducts: ApiProduct[];

  constructor(private _router: Router, private _route: ActivatedRoute, 
              private _similarsService: SimilarsService) { 
                console.log('similars slider construct');
  }

  OnSelectProduct(product: ApiProduct) {
      console.log('similars product ID: ' + product.ProductID);
      this._router.navigate(['/detail', { productID: product.ProductID }]);
  }

  GetProductsSlideByID(productID: number) {
    var __this = this;

    this._similarsService.getSimilarProducts(productID)
        .subscribe((apiProducts: ApiProduct[]) => {
          this.apiProducts = apiProducts;

          this.showButtons = true;

          setTimeout(function() {
            __this.SetupListeners();
          }, 1000);
        });
  }

  ngOnInit(): any {
      console.log('similars init');
      this._route.paramMap.subscribe(params => {
        this.productIDparam = params.get('productID');
        console.log('aya productID');
        console.log(this.productIDparam);

        if (this.productID) {
          this.GetProductsSlideByID(this.productID);
        }
        else if (this.productIDparam) {
          this.productID = Number(this.productIDparam);
          this.GetProductsSlideByID(this.productID);
        }
      })
  }

  SetupListeners() {
    var _this = this;

    var aya = document.getElementById("ayaTitle");
    console.log(aya);

    // PREVIOUS BUTTON
      var slidePrev = document.getElementById("prev" + this.productID.toString());
      let prodClassPrev = "prod".concat(this.productID.toString());
      slidePrev.classList.add(prodClassPrev);
  
      let buttonPrevId = ".slide-prev".concat(".", prodClassPrev);
      console.log(buttonPrevId);  

      $(buttonPrevId).on('click', function() {

        let wrapperId = "#wrap".concat(_this.productID.toString(), ".slide-wrapper ul");
  
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
    var slideNext = document.getElementById("next" + this.productID.toString());
    let prodClassNext = "prod".concat(this.productID.toString());
    slideNext.classList.add(prodClassNext);

    let buttonNextId = ".slide-next".concat(".", prodClassNext);
    console.log(buttonNextId);

    $(buttonNextId).on('click', function() {

      // var _this = this;
      let wrapperId = "#wrap".concat(_this.productID.toString(), ".slide-wrapper ul");

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
