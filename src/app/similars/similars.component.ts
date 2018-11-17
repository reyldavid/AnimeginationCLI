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
  lastScrollPos: number = 0;

  productIDparam: string;

  public apiProducts: ApiProduct[] = [];

  constructor(private _router: Router, private _route: ActivatedRoute, 
              private _similarsService: SimilarsService) { 
                console.log('similars slider construct');
  }

  OnSelectProduct(product: ApiProduct) {
      console.log('similars product ID: ' + product.ProductID);
      this._router.navigate(['/detail'], { queryParams: { productID: product.ProductID } });
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
        this.RemoveListeners(this.productID.toString());
      }

      if (this.productIDparam) {
        this.productID = Number(this.productIDparam);
      }
      this.GetProductsSlideByID(this.productID);
    })

    this._route.queryParams.subscribe(params => {
      let productID = params.productID;

      if (productID) {
        this.productID = productID;
        this.GetProductsSlideByID(productID);
      }
  })

  }

  RemoveListeners(productID: string) {
      let prevId = "#prev".concat(productID);
      $(prevId).off('click');
      let nextId = "#next".concat(productID);
      $(nextId).off('click');
  }

  SetupListeners() {
    var _this = this;

    // PREVIOUS BUTTON
      let prevId = "prev".concat(this.productID.toString());
      var slidePrev = document.getElementById(prevId);
      let prodClassPrev = "prod".concat(this.productID.toString());

      let classesPrev = slidePrev.className.split(" ").filter(function(c) {
        return c.lastIndexOf("prod", 0) !== 0;
      });
      classesPrev.push(prodClassPrev);

      slidePrev.className = classesPrev.join(" ").trim();
      // slidePrev.classList.add(prodClassPrev);
      console.log('aya prev className ' + slidePrev.className);
  
      let buttonPrevId = ".slide-prev".concat(".", prodClassPrev);
      buttonPrevId = "#" + prevId;
      console.log(buttonPrevId);  

      $(buttonPrevId).on('click', function() {

        let wrapperId = "#wrap".concat(_this.productID.toString(), ".slide-wrapper ul");
  
        let scrollPosition = $(wrapperId).scrollLeft();
        console.log('aya prev ' + buttonPrevId + '  ' + wrapperId);
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

        _this.lastScrollPos = $(wrapperId).scrollLeft();

        if (scrollPosition > _this.outerWidth) {
          _this.outerWidth = scrollPosition;
        }
  
    });

    // NEXT BUTTON
    let nextId = "next" + this.productID.toString();
    var slideNext = document.getElementById(nextId);
    let prodClassNext = "prod".concat(this.productID.toString());

    let classesNext = slideNext.className.split(" ").filter(function(c) {
      return c.lastIndexOf("prod", 0) !== 0;
    });
    classesNext.push(prodClassNext);

    slideNext.className = classesNext.join(" ").trim();
    // slideNext.classList.add(prodClassNext);
    console.log('aya next className ' + slideNext.className);

    let buttonNextId = ".slide-next".concat(".", prodClassNext);
    buttonNextId = "#" + nextId;
    console.log(buttonNextId);

    $(buttonNextId).on('click', function() {

      // var _this = this;
      let wrapperId = "#wrap".concat(_this.productID.toString(), ".slide-wrapper ul");

      // let scrollPosition = $('#wrap5.slide-wrapper ul').scrollLeft();
      let scrollPosition = $(wrapperId).scrollLeft();
      console.log('aya next ' + buttonNextId + '  ' + wrapperId);
      console.log(scrollPosition + ' : ' + _this.lastScrollPos + ' : ' + _this.outerWidth);

      let remainder = scrollPosition % 200;
      if (scrollPosition > 0 && scrollPosition == _this.outerWidth && remainder > 0) {

        $(wrapperId).animate({
          scrollLeft: '0'
        }, 500, 'swing');
      }
      else if (scrollPosition == _this.lastScrollPos && _this.lastScrollPos > 0) {
        $(wrapperId).animate({
          scrollLeft: '0'
        }, 500, 'swing');
      }
      else {
        $(wrapperId).animate({
          scrollLeft: '+=200'
        }, 300, 'swing');
      }

      _this.lastScrollPos = $(wrapperId).scrollLeft();

      if (scrollPosition > _this.outerWidth) {
        _this.outerWidth = scrollPosition;
      }
    });

    $(window).resize(function() {
      _this.outerWidth = 0;
      _this.lastScrollPos = 0;
    })
  }

}
