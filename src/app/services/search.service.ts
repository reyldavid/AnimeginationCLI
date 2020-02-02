/**
* Created by reynaldodavid on 9/12/18.
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
import { ApiProduct } from '../models/product';
import { ApiProductsCache } from '../models/dictionary';
import 'rxjs/Rx';
// import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../services/message.service';
//import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
  })
  export class SearchService {

    private _animeSearch = new ApiProductsCache();
    private _animeSimilars = new ApiProductsCache();

    constructor(private http: HttpClient, 
        private globals: Globals, 
        private helper: HttpHelper, 
        private messageService: MessageService) {
    }

    setSearchCache(data: ApiProduct[], searchText: string) {
        if (!this._animeSearch[searchText]) {
            this._animeSearch[searchText] = data;
        }
    }

    setSimilarsCache(data: ApiProduct[], id: number) {
        if (!this._animeSimilars[id]) {
            this._animeSimilars[id] = data;
        }
    }

    getAnimeSearchStatic(): Observable<ApiProduct[]> {
        let endpoint = 'assets/search.data.json';

        let result = this.http.get<ApiProduct[]>(
            endpoint
        )
        .pipe( catchError( HttpHelper.handleError ));

        return result;
    }

    getAnimeSearch(searchText: string): Observable<ApiProduct[]> {

        if (this.globals.localData) {
            return this.getAnimeSearchStatic();
        }
        else {
            if (this._animeSearch && this._animeSearch[searchText]) {

                return of(this._animeSearch[searchText]);
            }
            else {
                this.messageService.setSpinner(true);                
                let endpoint = this.helper.getSearchEndPoint(ServiceName.search, searchText);

                let headers: HttpHeaders = this.helper.getContentHeaders();
    
                let observables = this.http.get<ApiProduct[]>(
                    endpoint, { headers: headers, observe: 'response'}
                    )
                    .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

                return observables;
            }
        }
    }

    getAnimeSimilars(productId: number): Observable<ApiProduct[]> {

        if (this.globals.localData) {
            return this.getAnimeSearchStatic();
        }
        else {
            if (this._animeSimilars && this._animeSimilars[productId]) {

                return of(this._animeSimilars[productId]);
            }
            else {
                this.messageService.setSpinner(true);                
                let endpoint = this.helper.getEndPoint(ServiceName.similar, productId);

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
