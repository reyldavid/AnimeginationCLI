import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { SessionService } from '../../services/session.service';
import { CartType } from '../../models/carttype';
import { CartItem } from '../../models/cartItemModel';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { Globals } from 'src/app/globals';
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
  visitsSubscription: Subscription;

  constructor(private _router: Router, private _route: ActivatedRoute, 
              private _globals: Globals,
              private _cartService: CartService, 
              private _messageService: MessageService,
              private _sessionService: SessionService ) { 
    var _self = this;
    console.log('history construct');

    this.historySubscription = this._messageService.getHistory().subscribe(productId => {
      console.log("history Product ID: ", productId);
      this.PostCachedVisits();
      this.GetVisitedProducts();
    })

    this.visitsSubscription = this._messageService.getVisits().subscribe(carryover => {
      if (carryover) {
        _.forEach(this.cartProducts, function(cp) {
          _self._sessionService.addVisitedProduct(cp.productID);
        })
      }
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

  PostCachedVisits() {
    var ____this = this;
    let productIds = this._sessionService.VisitedProducts;

    if (productIds.length && this._sessionService.isAuthenticated()) {
        _.forEach(productIds, function(prodId) {
            ____this._cartService.addVisitHistory(prodId, 1).subscribe(item => {
              console.log(item);
            }, (error) => {
              console.log(error);
            })
        })

        this._sessionService.clearVisitedProducts();
    }
  }

  GetVisitedProducts() {
    this.showButtons = false;
    var ___this = this;

    // if (this._sessionService.isAuthenticated()) {

      this._cartService.getCartItems(this._sessionService.UserToken, CartType.recentlyVisited)
        .subscribe( items => {
          console.log('visited items');
          console.log(items);
          // this.cartProducts = _.reverse(items);
          this.cartProducts = items;

          this.showButtons = (items && items.length > this._globals.minHistoryVisitsToShow);

          // if (this.showButtons && this.initial) {
          if (this.showButtons) {
            this.initial = false;
            setTimeout(function() {
              ___this.SetupListeners();
            }, 1000);
          }
      })
    // }
  }

  // RemoveListeners(productID: string) {
  //     let prevId = "#prev".concat(productID);
  //     $(prevId).off('click');
  //     let nextId = "#next".concat(productID);
  //     $(nextId).off('click');
  // }

  SetupListeners() {
    var __this = this;
    this.title = "Your Browsing History";

    // PREVIOUS BUTTON
    var slidePrev = document.getElementById("prev" + this.idName);
    slidePrev.classList.add(this.idName);

    let buttonPrevId = ".slide-prev".concat(".", this.idName);
    console.log(buttonPrevId);

    $(buttonPrevId).on('click', function() {

      // var __this = this;
      let wrapperId = "#wrap".concat(__this.idName, ".slide-wrapper ul");

      let scrollPosition = $(wrapperId).scrollLeft();
      console.log('aya prev');
      console.log(scrollPosition);

      if (scrollPosition == 0 && __this.outerWidth > 0) {

        $(wrapperId).animate({
          scrollLeft: __this.outerWidth
        }, 500, 'swing');
      }
      else {
        $(wrapperId).animate({
          scrollLeft: '-=200'
        }, 300, 'swing');
      }

      if (scrollPosition > __this.outerWidth) {
        __this.outerWidth = scrollPosition;
      }

    });

    // NEXT BUTTON
    var slideNext = document.getElementById("next" + this.idName);
    slideNext.classList.add(this.idName);

    let buttonNextId = ".slide-next".concat(".", this.idName);
    console.log(buttonNextId);

    $(buttonNextId).on('click', function() {

      let wrapperId = "#wrap".concat(__this.idName, ".slide-wrapper ul");

      // let scrollPosition = $('#wrap5.slide-wrapper ul').scrollLeft();
      let scrollPosition = $(wrapperId).scrollLeft();
      console.log('aya next');
      console.log(scrollPosition);

      let remainder = scrollPosition % 200;
      if (scrollPosition > 0 && scrollPosition == __this.outerWidth && remainder > 0) {

        $(wrapperId).animate({
          scrollLeft: '0'
        }, 500, 'swing');
      }
      else {
        $(wrapperId).animate({
          scrollLeft: '+=200'
        }, 300, 'swing');
      }

      if (scrollPosition > __this.outerWidth) {
        __this.outerWidth = scrollPosition;
      }
    });        

    $(window).resize(function() {
      __this.outerWidth = 0;
    })
  }

}
