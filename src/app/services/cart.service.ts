/**
* Created by reynaldodavid on 10/05/18.
*/
import { Observable } from 'rxjs';
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

@Injectable({
    providedIn: 'root'
  })
  export class CartService {

    constructor(private http: HttpClient, 
        private globals: Globals, 
        private helper: HttpHelper, 
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
            this.messageService.setSpinner(true);
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
