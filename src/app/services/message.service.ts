import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {TokenModel} from '../models/tokenmodel';
import {UserAccountModel} from '../models/userAccountModel';
import { OrderItem } from '../models/orderItemModel';
import { Order } from '../models/orderModel';

@Injectable({
    providedIn: 'root'
  })
export class MessageService { 
    private token = new Subject<any>();
    private userAccount = new Subject<any>();
    private spinner = new Subject<any>();
    private footer = new Subject<any>();
    private cartItem = new Subject<any>();
    private order = new Subject<Order>();
    private returnUrl = new BehaviorSubject<string>("");
    private orderId = new Subject<number>();
    private roles = new Subject<string[]>();

    selectToken(token: TokenModel) {
        this.token.next(token);
    }

    getToken(): Observable<TokenModel> {
        return this.token.asObservable();
    }

    clearToken() {
        this.token.next();
    }

    selectUserAccount(userAccount: UserAccountModel) {
        this.userAccount.next(userAccount);
    }

    getUserAccount(): Observable<UserAccountModel> {
        return this.userAccount.asObservable();
    }

    clearUserAccount() {
        this.userAccount.next();
    }

    setSpinner(show: boolean) {
        this.spinner.next(show);
    }

    getSpinner(): Observable<boolean> {
        return this.spinner.asObservable();
    }

    clearSpinner() {
        this.spinner.next();
    }

    selectFooter(show: boolean) {
        this.footer.next(show);
    }

    getFooter(): Observable<boolean> {
        return this.footer.asObservable();
    }

    clearFooter() {
        this.footer.next();
    }

    setCartItem(cartItem: OrderItem) {
        this.cartItem.next(cartItem);
    }

    getCartItem(): Observable<OrderItem> {
        return this.cartItem.asObservable();
    }

    clearCartItem() {
        this.cartItem.next();
    }

    setOrder(order: Order) {
        this.order.next(order);
    }

    getOrder(): Observable<Order> {
        return this.order.asObservable();
    }

    clearOrder() {
        this.order.next();
    }

    setReturnUrl(returnUrl: string) {
        this.returnUrl.next(returnUrl);
    }

    getReturnUrl(): string {
        return this.returnUrl.getValue();
    }

    setOrderId(orderId: number) {
        this.orderId.next(orderId);
    }

    getOrderId(): Observable<number> {
        return this.orderId.asObservable();
    }

    clearOrderId() {
        this.orderId.next();
    }

    setRoles(roles: string[]) {
        this.roles.next(roles);
    }
    getRoles(): Observable<string[]> {
        return this.roles.asObservable();
    }
    clearRoles() {
        this.roles.next();
    }
}