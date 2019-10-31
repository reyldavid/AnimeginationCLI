/**
* Created by reynaldodavid on 10/15/19.
*/
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from "../globals";
import { HttpHelper } from './http.helper.service';
import { ServiceName } from '../models/service';
import { TokenModel } from '../models/tokenmodel';
import { FeedbackType } from '../models/feedbackType';
import { UserFeedbackModel } from '../models/userFeedbackModel';
import { UserFeedback } from '../models/userFeedback';
import { MessageService } from '../services/message.service';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
  })
  export class UserFeedbackService {

    constructor(private http: HttpClient, 
        private globals: Globals, 
        private helper: HttpHelper, 
        private messageService: MessageService ) {
    }

    getUserFeedbacks(token: TokenModel): Observable<UserFeedback[]> {

        if (this.globals.localData) {
            // return this.getUserFeedbacksStatic();
        }
        else {
            this.messageService.setSpinner(true);
            let endpoint = this.helper.getEndPoint(ServiceName.userFeedback);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            let observables = this.http.get<UserFeedback[]>(
                endpoint, { headers: headers, observe: 'response'}
                )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

            return observables;
        }
    }

    getFeedbacksByProductId(token: TokenModel, id: number): Observable<UserFeedbackModel[]> {

        if (this.globals.localData) {
            // return this.getUserFeedbacksStatic();
        }
        else {
            this.messageService.setSpinner(true);
            let endpoint = this.helper.getEndPoint(ServiceName.userFeedback, id);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            let observables = this.http.get<UserFeedbackModel[]>(
                endpoint, { headers: headers, observe: 'response'}
                )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

            return observables;
        }
    }

    addUserFeedback(token: TokenModel, feedback: UserFeedbackModel): Observable<UserFeedbackModel> {

        if (this.globals.localData) {
            // return this.getUserFeedbacksStatic();
        }
        else {
            this.messageService.setSpinner(true);
            let endpoint = this.helper.getEndPoint(ServiceName.userFeedback);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            let body = JSON.stringify(feedback);

            let observables = this.http.put<UserFeedbackModel>(
                endpoint, body, { headers: headers, observe: 'response'}
                )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

            return observables;
        }
    }

    deleteUserFeedback(token: TokenModel, id: number): Observable<UserFeedbackModel> {

        this.messageService.setSpinner(true);
        let endpoint = this.helper.getEndPoint(ServiceName.userFeedback, id);
        let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

        let observables = this.http.delete<UserFeedbackModel>(
            endpoint, { headers: headers, observe: 'response'} )
            .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

        return observables;
    }

}
