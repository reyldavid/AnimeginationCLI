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
import { Order } from '../models/orderModel';
import { MessageService } from '../services/message.service';
import { OrderItem } from '../models/orderItemModel';
import * as _ from 'lodash';

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

    getOrders(token: TokenModel): Observable<Order[]> {

        if (this.globals.localData) {
            // return this.getOrdersStatic();
        }
        else {
            this.messageService.setSpinner(true);
            let endpoint = this.helper.getEndPoint(ServiceName.orders);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            let observables = this.http.get<Order[]>(
                endpoint, { headers: headers, observe: 'response'}
                )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

            return observables;
        }
    }

    getOrdersByType(token: TokenModel, orderType: CartType): Observable<CartItem[]> {

        if (this.globals.localData) {
            // return this.getCartItemsStatic();
        }
        else {
            this.messageService.setSpinner(true);
            let endpoint = this.helper.getSearchEndPoint(ServiceName.cartItems, orderType);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            let observables = this.http.get<CartItem>(
                endpoint, { headers: headers, observe: 'response'}
                )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

            return observables;
        }
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

    updateOrder(token: TokenModel, order: Order): Observable<Order> {

        if (this.globals.localData) {
            // return this.getOrdersStatic();
        }
        else {
            this.messageService.setSpinner(true);
            let body = JSON.stringify(order);

            let endpoint = this.helper.getEndPoint(ServiceName.orders);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            let observables = this.http.post<Order>(
                    endpoint, body, 
                    { headers: headers, observe: 'response'} )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

            return observables;
        }
    }

    deleteOrderItem(token: TokenModel, id: number): Observable<OrderItem> {

        this.messageService.setSpinner(true);
        let endpoint = this.helper.getEndPoint(ServiceName.orderItems, id);
        let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

        let observables = this.http.delete<OrderItem>(
            endpoint, { headers: headers, observe: 'response'} )
            .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

        return observables;
    }

    moveOrderItem(token: TokenModel, id: number, cartType: string) {

        this.messageService.setSpinner(true);
        let endpoint = this.helper.getComplexEndPoint(ServiceName.orderItems, ServiceName.move, id, cartType);

        let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

        let observables = this.http.get<OrderItem>(
                endpoint, { headers: headers, observe: 'response'} )
            .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

        return observables;
    }

    getOrderItemsById(token: TokenModel, id: number): Observable<OrderItem[]> {

        if (this.globals.localData) {
            // return this.getOrdersStatic();
        }
        else {
            // this.messageService.setSpinner(true);
            let endpoint = this.helper.getEndPoint(
                ServiceName.orderItems, id);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            let observables = this.http.get<OrderItem[]>(
                endpoint, { headers: headers, observe: 'response'}
                )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

            return observables;
        }
    }

    castToOrderType(orders: Order[]): Order[] {
        let newOrders = _.map(orders, function(order) {
            let newOrder: Order = { 
                orderID: order.OrderID,
                userId: order.UserId, 
                shippingHandling: order.ShippingHandling,
                taxes: order.Taxes, 
                discounts: order.Discounts, 
                totals: order.Totals,
                orderDate: order.OrderDate, 
                isPurchased: order.IsPurchased,
                trackingNumber: order.TrackingNumber, 
                orderType: order.OrderType, 
                itemQuantity: 0,
                productQuantity: 0, 
                subTotal: 0
            }
            return newOrder;
        });
        return newOrders;
    }
}
