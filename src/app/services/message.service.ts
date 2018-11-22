import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';
import {TokenModel} from '../models/tokenmodel';
import {UserAccountModel} from '../models/userAccountModel';

@Injectable()
export class MessageService { 
    private token = new Subject<any>();
    private userAccount = new Subject<any>();

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
}