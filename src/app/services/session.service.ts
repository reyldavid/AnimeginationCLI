import { Injectable } from "@angular/core";
import { TokenModel } from '../models/tokenmodel';
import { UserAccountModel } from '../models/userAccountModel';
import { Order } from "../models/orderModel";

@Injectable({
    providedIn: 'root'
  })
export class SessionService {

    private _token: TokenModel = { token: "" };
    private _userAccount: UserAccountModel = {
        UserId: "", UserName: "",
        FirstName: "", LastName: "",
        Address: "", City: "", State: "", StateId: 0, ZipCode: "",
        CellPhone: "", HomePhone: "",
        Email: "", Created: "",
        CreditCardType: "", CreditCardNumber: "", CreditCardExpiration: ""
    };
    private _order: Order;
    private _isAdmin: boolean = false;

    isAuthenticated(): boolean {
        // // We get the JWT from localStorage
        // let token = localStorage.getItem('jwt');
        // this._token = { token: token }
        // // We also store the decoded JSON from this JWT
        // //this.decodedJwt = this.jwt && (<any>window).jwt_decode(this.jwt);

        if (this._token && this._token.token) {
            return true
        }
        return false;
    }

    get UserToken(): TokenModel {
        // // We get the JWT from localStorage
        // let token = localStorage.getItem('jwt');
        // this._token = { token: token }

        return this._token;
    }

    set UserToken(token: TokenModel) {
        // // We set the JWT into localStorage
        // localStorage.setItem('jwt', token.token);

        this._token = token;
    }

    get Order(): Order {
        return this._order;
    }
    set Order(order: Order) {
        this._order = order;
    }

    clearSession() {
        // // We simply remove JWT from localStorage
        // localStorage.removeItem('jwt');

        this._token = null;
        this._userAccount = {
            UserId: "", UserName: "",
            FirstName: "", LastName: "",
            Address: "", City: "", State: "", StateId: 0, ZipCode: "",
            CellPhone: "", HomePhone: "",
            Email: "", Created: "",
            CreditCardType: "", CreditCardNumber: "", CreditCardExpiration: ""
        };
        this._order = null;
    }

    get UserAccount(): UserAccountModel {
        return this._userAccount;
    }

    set UserAccount(userAccount: UserAccountModel) {
        this._userAccount = userAccount;
    }

    get IsAdmin(): boolean {
        return this._isAdmin;
    }
    
    set IsAdmin(isAdmin: boolean) {
        this._isAdmin = isAdmin;
    }
}
