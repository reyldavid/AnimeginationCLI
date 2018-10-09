/**
* Created by reynaldodavid on 9/08/18.
*/
import { Observable } from 'rxjs';
import { of } from "rxjs/observable/of";
import { map } from 'rxjs/operators';
import { catchError } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Globals } from "../globals";
import { HttpHelper } from './http.helper.service';
import { environment } from '../../environments/environment';
import { ServiceName } from '../models/service';
import { ApiProduct } from '../models/product';
import { ClaimModel } from '../models/claimmodel';
import { TokenModel } from '../models/tokenmodel';
import { ApiProductCache, ApiProductsCache } from '../models/dictionary';
import 'rxjs/Rx';
// import { Subscription } from 'rxjs/Subscription';
// import { MessageService } from '../services/message.service';
//import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
  })
  export class ProductsService {

    claim: ClaimModel;
    token: TokenModel;

    private _animeProduct = new ApiProductCache();
    private _animeProducts = new ApiProductsCache();

    constructor(private http: HttpClient, 
        private globals: Globals, 
        private helper: HttpHelper) {
        // private messageService: MessageService) {
    }

    setProductsCache(data: ApiProduct[]) {
        if (!this._animeProducts[0]) {
            this._animeProducts[0] = data;
        }
    }

    setProductCache(data: ApiProduct, id:number) {
        if (!this._animeProduct[id]) {
            this._animeProduct[id] = data;
        }
    }

    getAnimeProductsStatic(): Observable<ApiProduct[]> {
        let endpoint = 'assets/products.data.json';

        let result = this.http.get<ApiProduct[]>(
            endpoint
        )
        .pipe( catchError( HttpHelper.handleError ));

        return result;
    }

    // getAnimeProductStatic(id: number): Observable<ApiProduct[]> {
    //     let endpoint = 'assets/products.data.json';

    //     let result = this.http.get<ApiProduct[]>(
    //         endpoint
    //     )
    //     .pipe( catchError( HttpHelper.handleError ));

    //     let index = Math.floor(Math.random() * 30) + 1;

    //     return result;
    // }

    getAnimeProducts(): Observable<ApiProduct[]> {

        if (this.globals.localData) {
            return this.getAnimeProductsStatic();
        }
        else {
            if (this._animeProducts && this._animeProducts[0]) {

                console.log('aya Anime Products cached');
                
                return of(this._animeProducts[0]);
            }
            else {
                // this.messageService.setSpinner(true);                
                let endpoint = this.helper.getEndPoint(ServiceName.product);

                let headers: HttpHeaders = this.helper.getContentHeaders();
    
                let observables = this.http.get<ApiProduct[]>(
                    endpoint, { headers: headers, observe: 'response'}
                    )
                    .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

                return observables;
            }
        }

    }

    getAnimeProduct(productID: number): Observable<ApiProduct> {

        if (this.globals.localData) {
            // return this.getAnimeProductsStatic()[0];
            return of(null);
        }
        else {
            if (this._animeProduct && this._animeProduct[productID]) {

                console.log('aya Anime Product cached');
                
                return of(this._animeProduct[productID]);
            }
            else {
                // this.messageService.setSpinner(true);                
                let endpoint = this.helper.getEndPoint(ServiceName.product, productID);

                let headers: HttpHeaders = this.helper.getContentHeaders();
    
                let observables = this.http.get<ApiProduct>(
                    endpoint, { headers: headers, observe: 'response'}
                    )
                    .pipe( map ( HttpHelper.extractFirst), catchError( HttpHelper.handleError ));

                return observables;
            }
        }

    }
}
