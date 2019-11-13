import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { SessionService } from '../services/session.service';
import { MessageService } from '../services/message.service';
import { OrderService } from '../services/orders.service';
import { Subscription } from 'rxjs/Subscription';
import { Globals } from '../globals';
import { Order } from '../models/orderModel';
import { CartType } from '../models/carttype';
import { ProductsService } from '../services/products.service';
// import { $ } from 'protractor';
import * as _ from 'lodash';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  public userFirstName: string;
  showFooter: boolean= true;
  loggingIn: boolean = false;
  footerSubscription: Subscription;
  spinnerSubscription: Subscription;
  orderSubscription: Subscription;
  itemsSubscription: Subscription;
  adminRoleSubscription: Subscription;
  order: Order;
  isAdmin: boolean = false;

  constructor(private _router: Router, 
              private _loginService: LoginService, 
              private _sessionService: SessionService, 
              private _messageService: MessageService,
              private _orderService: OrderService,  
              private _productsService: ProductsService,
              private _globals: Globals ) {
        
        console.log("navigation construct");
        _loginService.userLoggedIn.subscribe(firstName => {
            this.userFirstName = firstName;
        });

        // this.footerSubscription = _messageService.getFooter().subscribe( show => {
        //     this.showFooter = show;
        // })
        //   localStorage.removeItem('jwt');
        // this._sessionService.clearSession();
        // this._router.navigate(['Home']);
        if (_sessionService.isAuthenticated()) {
            this.userFirstName = _sessionService.UserAccount.firstName;
        }

        this.spinnerSubscription = _messageService.getSpinner().subscribe( show => {
            if (show) {
                $('#spinner').modal({ show: true });
            }
            else {
                $('#spinner').modal('hide');
                // $('.modal-backdrop').remove();
                setTimeout(function() {
                    $('#spinner').modal('hide');
                    $('.modal-backdrop').remove();
                }, _globals.spinnerDelay);
            }
        })

        this.itemsSubscription = _messageService.getOrder().subscribe(order => {
            this.order = order;
        })

        this.adminRoleSubscription = _messageService.getRoles().subscribe(roles => {
            let hasAdmin = _.includes(roles, "Admin");
            this.isAdmin = hasAdmin;
            this._sessionService.IsAdmin = hasAdmin;
        })

        _productsService.getAnimeProducts().subscribe(products => {
            _productsService.setProductsCache(products);
      
            console.log("aya products cached");
        })
  }

  ngOnInit(): any {
      this.isAdmin = false;
      this._sessionService.IsAdmin = false;
      console.log('navigation init');
    //   this.showFooter = true;
    if (this._sessionService.isAuthenticated()) {
        this.orderSubscription = this._orderService.getOrderTotals(
            this._sessionService.UserToken, CartType.shoppingCart)
            .subscribe(order => {
                this.order = order;
        })
    }
}

  ngOnDestroy() {
    this.footerSubscription.unsubscribe();
    this.spinnerSubscription.unsubscribe();
    this.orderSubscription.unsubscribe();
    this.itemsSubscription.unsubscribe();
    this.adminRoleSubscription.unsubscribe();
  }

  onSearch(searchText: string) {
      console.log('onSearch ' + searchText);
      this._router.navigate(['/search'], { queryParams: { searchText: searchText } });
  }

  logout() {
      // Logging out means just deleting the JWT from localStorage and redirecting the user to the Login page
      //   localStorage.removeItem('jwt');
      this._sessionService.clearSession();
      this.userFirstName = '';
      this.order = null;
      this.isAdmin = false;
      this._sessionService.IsAdmin = false;
    //   let returnUrl = window.location.pathname;
    //   this._router.navigateByUrl(returnUrl);
    //   this._router.navigate([returnUrl]);
       this._router.navigate(['/home'])
  }

  login() {
    // this.loggingIn = true;
    let returnUrl = window.location.pathname;
    let search = window.location.search;
    returnUrl = search ? returnUrl.concat(search) : returnUrl;
    if (!returnUrl.includes("/login?")) {
        this._router.navigate(['/login'], { queryParams: {  returnUrl: returnUrl } });
    }
  }

}
