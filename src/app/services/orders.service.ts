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
import { CartType } from '../models/carttype';
import { TokenModel } from '../models/tokenmodel';
import { Order } from '../models/orderModel';

@Injectable({
    providedIn: 'root'
  })
  export class OrderService {

    constructor(private http: HttpClient, 
        private globals: Globals, 
        private helper: HttpHelper) {
    }

    getOrdersStatic(): Observable<Order> {
        let endpoint = 'assets/orders.data.json';

        let result = this.http.get<Order>(
            endpoint
        )
        .pipe( catchError( HttpHelper.handleError ));

        return result;
    }

    getOrderTotals(token: TokenModel, cartType: CartType): Observable<Order> {

        if (this.globals.localData) {
            return this.getOrdersStatic();
        }
        else {
            // this.messageService.setSpinner(true);
            let endpoint = this.helper.getSearchEndPoint(ServiceName.orders, cartType);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            let observables = this.http.get<Order>(
                endpoint, { headers: headers, observe: 'response'}
                )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

            return observables;
        }
    }
}
