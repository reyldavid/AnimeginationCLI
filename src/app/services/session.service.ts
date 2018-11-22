import { Injectable } from "@angular/core";
import { TokenModel } from '../models/tokenmodel';
import { UserAccountModel } from '../models/userAccountModel';

@Injectable()
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

    isAuthenticated(): boolean {
        // We get the JWT from localStorage
        let token = localStorage.getItem('jwt');
        this._token = { token: token }
        // We also store the decoded JSON from this JWT
        //this.decodedJwt = this.jwt && (<any>window).jwt_decode(this.jwt);

        if (this._token && this._token.token) {
            return true
        }
        return false;
    }

    get UserToken(): string {
        // We set the JWT into localStorage
        let token = localStorage.getItem('jwt');
        this._token = { token: token }

        return this._token.token;
    }

    set UserToken(token: string) {
        localStorage.setItem('jwt', token);

        this._token = { token: token }
    }

    clearToken() {
        // We simply remove JWT from localStorage
        localStorage.removeItem('jwt');

        this._token = null;
    }

}
