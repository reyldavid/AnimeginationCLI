/**
* Created by reynaldodavid on 10/05/18.
*/
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from "../globals";
import { HttpHelper } from './http.helper.service';
import { ServiceName } from '../models/service';
import { CartItem } from '../models/cartItemModel';
import { CartType } from '../models/carttype';
import { TokenModel } from '../models/tokenmodel';
import { MessageService } from './message.service';
import { AddItem } from '../models/addItemModel';
import { OrderItem } from '../models/orderItemModel';
import { Router } from '@angular/router';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root'
  })
  export class CartService {

    constructor(private http: HttpClient, 
        private globals: Globals, 
        private helper: HttpHelper, 
        private router: Router,
        private sessionService: SessionService, 
        private messageService: MessageService ) {
    }

    getCartItemsStatic(): Observable<CartItem[]> {
        let endpoint = 'assets/cartitems.data.json';

        let result = this.http.get<CartItem[]>(
            endpoint
        )
        .pipe( catchError( HttpHelper.handleError ));

        return result;
    }

    getCartItems(token: TokenModel, cartType: CartType): Observable<CartItem[]> {

        if (this.globals.localData) {
            return this.getCartItemsStatic();
        }
        else {
            if (cartType != CartType.recentlyVisited) {
                this.messageService.setSpinner(true);
            }
            if (cartType == CartType.recentlyVisited && !this.sessionService.isAuthenticated()) {
                if (this.sessionService.VisitedProducts.length > this.globals.minHistoryVisitsToShow ) {

                    let endpoint = this.helper.getCompoundEndPoint(ServiceName.cartItems, ServiceName.list);

                    let headers: HttpHeaders = this.helper.getContentHeaders();
                    let body = JSON.stringify(this.sessionService.VisitedProducts);

                    let observables = this.http.post<CartItem[]>(
                        endpoint, body, { headers: headers, observe: 'response'}
                        )
                        .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

                    return observables;
                }
                else {
                    return of([]);
                }
            }
            else {
                let endpoint = this.helper.getSearchEndPoint(ServiceName.cartItems, cartType);

                let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

                let observables = this.http.get<CartItem>(
                    endpoint, { headers: headers, observe: 'response'}
                    )
                    .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

                return observables;
            }
        }
    }

    addCartItem(token: TokenModel, cartItem: AddItem): Observable<OrderItem> {

        if (this.globals.localData) {
            // return this.getCartItemsStatic();
        }
        else {
            this.messageService.setSpinner(true);
            let endpoint = this.helper.getEndPoint(ServiceName.cartItems);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            let body = JSON.stringify(cartItem);

            let observables = this.http.put<OrderItem>(
                endpoint, body, { headers: headers, observe: 'response'}
                )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

            return observables;
        }
    }

    addVisitHistory(productId: number, skipInfiniteLoop?: number): Observable<OrderItem> {

        let observables = of(null);

        if (this.sessionService.isAuthenticated()) {
            let token = this.sessionService.UserToken;
      
            let endpoint = this.helper.getCompoundIdEndPoint(
                ServiceName.addItem, productId, CartType.recentlyVisited);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            observables = this.http.get<OrderItem>(
                endpoint, { headers: headers, observe: 'response'}
                )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));
        }
        else {
            this.sessionService.addVisitedProduct(productId);
        }
        this.router.navigate(['/detail'], { queryParams: { productID: productId } });

        if (skipInfiniteLoop && skipInfiniteLoop == 1) {
            // do not fall for infinite loop
        }
        else {
            this.messageService.setHistory(productId);
        }

        return observables;
    }
}
