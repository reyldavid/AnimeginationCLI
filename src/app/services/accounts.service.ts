/**
* Created by reynaldodavid on 9/15/18.
*/
import { Observable } from 'rxjs';
import { of } from "rxjs/observable/of";
import { map } from 'rxjs/operators';
import { catchError } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpHelper } from './http.helper.service';
import { ServiceName } from '../models/service';
import { TokenModel } from '../models/tokenmodel';
import { RegisterModel } from '../models/registermodel';
import { UserReturnModel } from '../models/userReturnModel';
// import 'rxjs/Rx';
// import { Subscription } from 'rxjs/Subscription';
// import { MessageService } from '../services/message.service';
//import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
  })
  export class AccountService {

    constructor(private http: HttpClient, 
        private helper: HttpHelper) {
        // private messageService: MessageService) {
    }

    userLogin(username: string, password: string): Observable<TokenModel> {
        let body = JSON.stringify({ username, password });

        let endpoint = this.helper.getCompoundEndPoint(ServiceName.account, ServiceName.login);

        let header: HttpHeaders = this.helper.getContentHeaders();

        let observable = this.http.post<TokenModel>(endpoint, body, 
            { headers: header, observe: 'response' })
            .pipe( map ( HttpHelper.extractData), 
                catchError( HttpHelper.handleError ));

        return observable;
    }

    createUser(registerModel: RegisterModel): Observable<UserReturnModel> {
        let body = JSON.stringify(registerModel);

        let endpoint = this.helper.getCompoundEndPoint(ServiceName.account, ServiceName.create);

        let header: HttpHeaders = this.helper.getContentHeaders();

        let observable = this.http.post<UserReturnModel>(endpoint, body, 
            { headers: header, observe: 'response' })
            .pipe( map ( HttpHelper.extractData), 
                catchError( HttpHelper.handleError ));

        return observable;
    }

}
