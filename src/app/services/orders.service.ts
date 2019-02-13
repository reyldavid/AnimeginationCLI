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
import { MessageService } from '../services/message.service';
import { OrderItem } from '../models/orderItemModel';

@Injectable({
    providedIn: 'root'
  })
  export class OrderService {

    constructor(private http: HttpClient, 
        private globals: Globals, 
        private helper: HttpHelper, 
        private messageService: MessageService ) {
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
            this.messageService.setSpinner(true);
            let endpoint = this.helper.getSearchEndPoint(ServiceName.orders, cartType);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            let observables = this.http.get<Order>(
                endpoint, { headers: headers, observe: 'response'}
                )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

            return observables;
        }
    }

    getOrderById(token: TokenModel, id: number): Observable<Order[]> {

        if (this.globals.localData) {
            // return this.getOrdersStatic();
        }
        else {
            this.messageService.setSpinner(true);
            let endpoint = this.helper.getCompoundEndPoint(ServiceName.orders, ServiceName.id, id);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            let observables = this.http.get<Order[]>(
                endpoint, { headers: headers, observe: 'response'}
                )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

            return observables;
        }
    }

    getOrderItemById(token: TokenModel, id: number): Observable<OrderItem> {

        if (this.globals.localData) {
            // return this.getOrdersStatic();
        }
        else {
            this.messageService.setSpinner(true);
            let endpoint = this.helper.getCompoundEndPoint(ServiceName.orderItems, ServiceName.id, id);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            let observables = this.http.get<OrderItem>(
                endpoint, { headers: headers, observe: 'response'}
                )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

            return observables;
        }
    }

    updateOrderItem(token: TokenModel, orderItem: OrderItem): Observable<OrderItem> {

        if (this.globals.localData) {
            // return this.getOrdersStatic();
        }
        else {
            this.messageService.setSpinner(true);
            let body = JSON.stringify(orderItem);

            let endpoint = this.helper.getEndPoint(ServiceName.orderItems);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            let observables = this.http.post<OrderItem>(
                    endpoint, body, 
                    { headers: headers, observe: 'response'} )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

            return observables;
        }
    }
}
