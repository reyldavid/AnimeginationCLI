/**
* Created by reynaldodavid on 9/15/18.
*/
import { Observable } from 'rxjs';
import { of } from "rxjs/observable/of";
import { map } from 'rxjs/operators';
import { catchError } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Globals } from "../globals";
import { HttpHelper } from './http.helper.service';
import { ServiceName } from '../models/service';
import { States } from '../models/states';
import { StatesCache } from '../models/dictionary';
import 'rxjs/Rx';
// import { Subscription } from 'rxjs/Subscription';
// import { MessageService } from '../services/message.service';
//import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
  })
  export class StatesService {

    private _animeStates = new StatesCache();

    constructor(private http: HttpClient, 
        private globals: Globals, 
        private helper: HttpHelper) {
        // private messageService: MessageService) {
    }

    setStatesCache(data: States[]) {
        if (!this._animeStates[0]) {
            this._animeStates[0] = data;
        }
    }

    getAnimeStatesStatic(): Observable<States[]> {
        let endpoint = 'assets/states.data.json';

        let result = this.http.get<States[]>(
            endpoint
        )
        .pipe( catchError( HttpHelper.handleError ));

        return result;
    }

    getAnimeStates(): Observable<States[]> {

        if (this.globals.localData) {
            return this.getAnimeStatesStatic();
        }
        else {
            if (this._animeStates && this._animeStates[0]) {

                console.log('aya Anime Statess cached');
                
                return of(this._animeStates[0]);
            }
            else {
                // this.messageService.setSpinner(true);                
                let endpoint = this.helper.getEndPoint(ServiceName.state);

                let headers: HttpHeaders = this.helper.getContentHeaders();
    
                let observables = this.http.get<States[]>(
                    endpoint, { headers: headers, observe: 'response'}
                    )
                    .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

                return observables;
            }
        }

    }
}
