/**
* Created by reynaldodavid on 10/14/19.
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
import { UserNoteModel } from '../models/userNoteModel';
import { MessageService } from '../services/message.service';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
  })
  export class UserNoteService {

    constructor(private http: HttpClient, 
        private globals: Globals, 
        private helper: HttpHelper, 
        private messageService: MessageService ) {
    }

    getUserNotes(token: TokenModel): Observable<UserNoteModel[]> {

        if (this.globals.localData) {
            // return this.getUserNotesStatic();
        }
        else {
            this.messageService.setSpinner(true);
            let endpoint = this.helper.getEndPoint(ServiceName.userNotes);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            let observables = this.http.get<UserNoteModel[]>(
                endpoint, { headers: headers, observe: 'response'}
                )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

            return observables;
        }
    }

    getUserNoteById(token: TokenModel, id: number): Observable<UserNoteModel[]> {

        if (this.globals.localData) {
            // return this.getUserNotesStatic();
        }
        else {
            this.messageService.setSpinner(true);
            let endpoint = this.helper.getEndPoint(ServiceName.userNotes, id);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            let observables = this.http.get<UserNoteModel[]>(
                endpoint, { headers: headers, observe: 'response'}
                )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

            return observables;
        }
    }

    addUserNote(token: TokenModel, userNote: UserNoteModel): Observable<UserNoteModel> {

        if (this.globals.localData) {
            // return this.getUserNotesStatic();
        }
        else {
            this.messageService.setSpinner(true);
            let endpoint = this.helper.getEndPoint(ServiceName.userNotes);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            let body = JSON.stringify(userNote);

            let observables = this.http.put<UserNoteModel>(
                endpoint, body, { headers: headers, observe: 'response'}
                )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

            return observables;
        }
    }

    deleteUserNote(token: TokenModel, id: number): Observable<UserNoteModel> {

        this.messageService.setSpinner(true);
        let endpoint = this.helper.getEndPoint(ServiceName.userNotes, id);
        let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

        let observables = this.http.delete<UserNoteModel>(
            endpoint, { headers: headers, observe: 'response'} )
            .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

        return observables;
    }

}
