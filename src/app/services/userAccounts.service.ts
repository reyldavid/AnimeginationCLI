import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from "rxjs/observable/of";
import { map } from 'rxjs/operators';
import { catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpHelper } from './http.helper.service';
import { ServiceName } from '../models/service';
import { TokenModel } from '../models/tokenmodel';
import { RegisterModel } from '../models/registermodel';
import { UserAccountModel } from '../models/userAccountModel';
import { UserAccountReturnModel } from '../models/userAccountReturnModel';
import { MessageService } from '../services/message.service';
//import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class UserAccountsService {

  constructor(private http: HttpClient, 
    private helper: HttpHelper, 
    private messageService: MessageService ) {
  }

  getUserAccount(token: TokenModel): Observable<UserAccountModel> {
      this.messageService.setSpinner(true);

      let endpoint = this.helper.getEndPoint(ServiceName.userAccount);

      let header: HttpHeaders = this.helper.getSecureContentHeaders(token);

      let observable = this.http.get<UserAccountModel>(endpoint, 
          { headers: header, observe: 'response' })
          .pipe( map ( HttpHelper.extractData), 
              catchError( HttpHelper.handleError ));

      return observable;
  }

  createUserAccount(registerModel: RegisterModel): Observable<TokenModel> {
      this.messageService.setSpinner(true);

      let body = JSON.stringify(registerModel);

      let endpoint = this.helper.getEndPoint(ServiceName.userAccount);

      let header: HttpHeaders = this.helper.getContentHeaders();

      let observable = this.http.post<TokenModel>(endpoint, body, 
          { headers: header, observe: 'response' })
          .pipe( map ( HttpHelper.extractData), 
              catchError( HttpHelper.handleError ));

      return observable;
  }

  updateUserAccountNames(token: TokenModel, userAccount: UserAccountModel): Observable<UserAccountReturnModel> {
    this.messageService.setSpinner(true);

    let body = JSON.stringify(userAccount);

    let endpoint = this.helper.getCompoundEndPoint(ServiceName.userAccount, ServiceName.names);

    let header: HttpHeaders = this.helper.getSecureContentHeaders(token);

    let observable = this.http.put<UserAccountModel>(endpoint, body,  
        { headers: header, observe: 'response' })
        .pipe( map ( HttpHelper.extractData), 
            catchError( HttpHelper.handleError ));

    return observable;
  }

  updateUserAccountAddress(token: TokenModel, userAccount: UserAccountModel): Observable<UserAccountReturnModel> {
    this.messageService.setSpinner(true);
    
    let body = JSON.stringify(userAccount);

    let endpoint = this.helper.getCompoundEndPoint(ServiceName.userAccount, ServiceName.address);

    let header: HttpHeaders = this.helper.getSecureContentHeaders(token);

    let observable = this.http.put<UserAccountModel>(endpoint, body,  
        { headers: header, observe: 'response' })
        .pipe( map ( HttpHelper.extractData), 
            catchError( HttpHelper.handleError ));

    return observable;
  }

}
