import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { SessionService } from '../../services/session.service';
import { CartType } from '../../models/carttype';
import { CartItem } from '../../models/cartItemModel';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import * as _ from 'lodash';
declare var $: any;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {

  title: string;
  idName: string = "History";
  showButtons: boolean = false;
  outerWidth: number = 0;
  lastScrollPos: number = 0;
  cartProducts: CartItem[] = [];
  initial: boolean = true;
  historySubscription: Subscription;

  constructor(private _router: Router, private _route: ActivatedRoute, 
              private _cartService: CartService, 
              private _messageService: MessageService,
              private _sessionService: SessionService ) { 
                console.log('similars slider construct');

    this.historySubscription = this._messageService.getHistory().subscribe(productId => {
      console.log("history Product ID: ", productId);
      this.GetVisitedProducts();
    })
  }

  ngOnInit(): any {
    console.log('history init');
    this.GetVisitedProducts();
  }

  ngOnDestroy(): void {
    this.historySubscription.unsubscribe();
  }

  OnSelectProduct(product: CartItem) {
      console.log('history product ID: ' + product.productID);
      // this._router.navigate(['/detail'], { queryParams: { productID: product.ProductID } });
      this._cartService.addVisitHistory(product.productID).subscribe(item => {
        console.log(item);
      })
    }

  GetVisitedProducts() {
    this.showButtons = false;
    var __this = this;

    if (this._sessionService.isAuthenticated()) {

      this._cartService.getCartItems(this._sessionService.UserToken, CartType.recentlyVisited)
        .subscribe( items => {
          console.log('visited items');
          console.log(items);
          this.cartProducts = _.reverse(items);

          this.showButtons = (items && items.length > 5);

          // if (this.showButtons && this.initial) {
          if (this.showButtons) {
            this.initial = false;
            setTimeout(function() {
              __this.SetupListeners();
            }, 1000);
          }
      })
    }
  }

  // RemoveListeners(productID: string) {
  //     let prevId = "#prev".concat(productID);
  //     $(prevId).off('click');
  //     let nextId = "#next".concat(productID);
  //     $(nextId).off('click');
  // }

  SetupListeners() {
    var _this = this;
    this.title = "Your Browsing History";

    // PREVIOUS BUTTON
    var slidePrev = document.getElementById("prev" + this.idName);
    slidePrev.classList.add(this.idName);

    let buttonPrevId = ".slide-prev".concat(".", this.idName);
    console.log(buttonPrevId);

    $(buttonPrevId).on('click', function() {

      // var _this = this;
      let wrapperId = "#wrap".concat(_this.idName, ".slide-wrapper ul");

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
    var slideNext = document.getElementById("next" + this.idName);
    slideNext.classList.add(this.idName);

    let buttonNextId = ".slide-next".concat(".", this.idName);
    console.log(buttonNextId);

    $(buttonNextId).on('click', function() {

      let wrapperId = "#wrap".concat(_this.idName, ".slide-wrapper ul");

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
