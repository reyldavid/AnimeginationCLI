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
import { Category } from '../models/category';
import { ApiProductsCache, CategoryCache, CategoriesCache } from '../models/dictionary';
// import 'rxjs/Rx';
// import { Subscription } from 'rxjs/Subscription';
// import { MessageService } from '../services/message.service';
//import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
  })
  export class CategoryService {

    private _animeCategory = new CategoryCache();
    private _animeCategories = new CategoriesCache();
    private _animeCategoryList = new ApiProductsCache();

    constructor(private http: HttpClient, 
        private globals: Globals, 
        private helper: HttpHelper) {
        // private messageService: MessageService) {
    }

    setCategoryCache(data: Category, categoryId: number) {
        if (!this._animeCategory[categoryId.toString()]) {
            this._animeCategory[categoryId.toString()] = data;
        }
    }

    setCategoriesCache(data: Category[]) {
        if (!this._animeCategories[0]) {
            this._animeCategories[0] = data;
        }
    } 

    setCategoryListCache(data: ApiProduct[], id: number) {
        if (!this._animeCategoryList[id.toString()]) {
            this._animeCategoryList[id.toString()] = data;
        }
    }

    getAnimeCategoryStatic(): Observable<Category[]> {
        let endpoint = 'assets/categories.data.json';

        let result = this.http.get<Category[]>(
            endpoint
        )
        .pipe( catchError( HttpHelper.handleError ));

        return result;
    }

    getAnimeCategoryListStatic(): Observable<ApiProduct[]> {
        let endpoint = 'assets/search.data.json';

        let result = this.http.get<ApiProduct[]>(
            endpoint
        )
        .pipe( catchError( HttpHelper.handleError ));

        return result;
    }

    getAnimeCategory(categoryId: number): Observable<Category> {

        if (this.globals.localData) {
            // return this.getAnimeCategoryStatic()[0];
            return of(null);
        }
        else {
            if (this._animeCategory && this._animeCategory[categoryId]) {

                console.log('aya Anime Category cached');
                
                return of(this._animeCategory[categoryId]);
            }
            else {
                // this.messageService.setSpinner(true);                
                let endpoint = this.helper.getEndPoint(ServiceName.category, categoryId);

                let headers: HttpHeaders = this.helper.getContentHeaders();
    
                let observables = this.http.get<Category>(
                    endpoint, { headers: headers, observe: 'response'}
                    )
                    .pipe( map ( HttpHelper.extractFirst,), catchError( HttpHelper.handleError ));

                return observables;
            }
        }
    }

    getAnimeCategories(): Observable<Category[]> {

        if (this.globals.localData) {
            return this.getAnimeCategoryStatic();
        }
        else {
            if (this._animeCategories && this._animeCategories[0]) {

                console.log('aya Anime Categories cached');
                
                return of(this._animeCategories[0]);
            }
            else {
                // this.messageService.setSpinner(true);                
                let endpoint = this.helper.getEndPoint(ServiceName.category);

                let headers: HttpHeaders = this.helper.getContentHeaders();
    
                let observables = this.http.get<Category[]>(
                    endpoint, { headers: headers, observe: 'response'}
                    )
                    .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

                return observables;
            }
        }
    }

    getAnimeCategoryList(categoryId: number): Observable<ApiProduct[]> {

        if (this.globals.localData) {
            return this.getAnimeCategoryListStatic();
        }
        else {
            if (this._animeCategoryList && this._animeCategoryList[categoryId]) {

                console.log('aya Anime CategoryList results cached');
                
                return of(this._animeCategoryList[categoryId]);
            }
            else {
                // this.messageService.setSpinner(true);                
                let endpoint = this.helper.getEndPoint(ServiceName.categoryList, categoryId);

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
