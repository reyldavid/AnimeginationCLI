/**
* Created by reynaldodavid on 9/10/18.
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
import { Listing } from '../models/listing';
import { ApiProduct } from '../models/product';
import { ListingCache } from '../models/dictionary';
import 'rxjs/Rx';
// import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../services/message.service';
//import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
  })
  export class ListingService {

    private _animeListing = new ListingCache();

    constructor(private http: HttpClient, 
        private globals: Globals, 
        private helper: HttpHelper, 
        private messageService: MessageService) {
    }

    setListingCache(data: Listing[], id: number) {
        if (!this._animeListing[id]) {
            this._animeListing[id] = data;
        }
    }

    getAnimeListingStatic(): Observable<ApiProduct[]> {
        let endpoint = 'assets/listings.data.json';

        let result = this.http.get<ApiProduct[]>(
            endpoint
        )
        .pipe( catchError( HttpHelper.handleError ));

        return result;
    }

    getAnimeListing(listTypeID: number): Observable<ApiProduct[]> {

        if (this.globals.localData) {
            return this.getAnimeListingStatic();
        }
        else {
            if (this._animeListing && this._animeListing[listTypeID]) {

                console.log('aya Anime Listings cached');
                
                return of(this._animeListing[listTypeID]);
            }
            else {
                this.messageService.setSpinner(true);                
                let endpoint = this.helper.getEndPoint(ServiceName.listings, listTypeID);

                let headers: HttpHeaders = this.helper.getContentHeaders();
    
                let observables = this.http.get<ApiProduct[]>(
                    endpoint, { headers: headers, observe: 'response'}
                    )
                    .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

                return observables;
            }
        }

    }
}
