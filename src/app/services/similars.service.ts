/**
* Created by reynaldodavid on 11/12/18.
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

@Injectable({
    providedIn: 'root'
  })
  export class SimilarsService {

    private _animeProducts = new ApiProductsCache();

    constructor(private http: HttpClient, 
        private globals: Globals, 
        private helper: HttpHelper) {
        // private messageService: MessageService) {
    }

    setProductsCache(data: ApiProduct[], id:number) {
        if (!this._animeProducts[id]) {
            this._animeProducts[id] = data;
        }
    }

    getSimilarProductsStatic(): Observable<ApiProduct[]> {
        let endpoint = 'assets/products.data.json';

        let result = this.http.get<ApiProduct[]>(
            endpoint
        )
        .pipe( catchError( HttpHelper.handleError ));

        return result;
    }

    getSimilarProducts(productID: number): Observable<ApiProduct[]> {

        if (this.globals.localData) {
            return this.getSimilarProductsStatic();
        }
        else {
            if (this._animeProducts && this._animeProducts[productID]) {

                console.log('aya Similar Products cached');
                
                return of(this._animeProducts[productID]);
            }
            else {
                // this.messageService.setSpinner(true);                
                let endpoint = this.helper.getEndPoint(ServiceName.similar, productID);

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
