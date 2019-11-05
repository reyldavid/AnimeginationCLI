/**
* Created by reynaldodavid on 9/12/18.
*/
import { Observable } from 'rxjs';
import { of } from "rxjs/observable/of";
import { map } from 'rxjs/operators';
import { catchError } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from "../globals";
import { HttpHelper } from './http.helper.service';
import { ServiceName } from '../models/service';
import { ApiProduct } from '../models/product';
import { Category } from '../models/category';
import { ApiProductsCache, CategoryCache, CategoriesCache } from '../models/dictionary';
import { TokenModel } from '../models/tokenmodel';
// import 'rxjs/Rx';
// import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../services/message.service';
//import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
  })
  export class CategoryService {

    private _animeCategory = new CategoryCache();
    private _animeCategories: Category[] = [];
    private _animeCategoryList = new ApiProductsCache();
    private _categories: Category[];

    constructor(private http: HttpClient, 
        private globals: Globals, 
        private helper: HttpHelper, 
        private messageService: MessageService) {
    }

    setCategoryCache(data: Category, categoryId: number) {
        if (!this._animeCategory[categoryId.toString()]) {
            this._animeCategory[categoryId.toString()] = data;
        }
    }

    setCategoriesCache(data: Category[]) {
        // if (!this._animeCategories[0]) {
        //     this._animeCategories[0] = data;
        // }
        this._animeCategories = data;
        this._categories = data;
    } 

    setCategoryListCache(data: ApiProduct[], id: number) {
        if (!this._animeCategoryList[id.toString()]) {
            this._animeCategoryList[id.toString()] = data;
        }
    }

    get Categories(): Category[] {
        return this._categories;
    }
    set Categories(categories: Category[]) {
        this._categories = categories;
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
                this.messageService.setSpinner(true);                
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
                
                return of(this._animeCategories);
            }
            else {
                this.messageService.setSpinner(true);                
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
                this.messageService.setSpinner(true);                
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

    updateCategory(token: TokenModel, category: Category): Observable<Category> {

      if (this.globals.localData) {
      }
      else {
          this.messageService.setSpinner(true);
          let body = JSON.stringify(category);

          let endpoint = this.helper.getEndPoint(ServiceName.category);

          let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

          let observables = this.http.post<Category>(
                  endpoint, body, 
                  { headers: headers, observe: 'response'} )
              .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

          return observables;
      }
    }

    addCategory(token: TokenModel, categoryItem: Category): Observable<Category> {

        if (this.globals.localData) {
        }
        else {
            this.messageService.setSpinner(true);
            let endpoint = this.helper.getEndPoint(ServiceName.category);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            let body = JSON.stringify(categoryItem);

            let observables = this.http.put<Category>(
                endpoint, body, { headers: headers, observe: 'response'}
                )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

            return observables;
        }
    }

    deleteCategory(token: TokenModel, category: Category): Observable<Category> {

        if (this.globals.localData) {
        }
        else {
            this.messageService.setSpinner(true);
            let body = JSON.stringify(category);

            let endpoint = this.helper.getEndPoint(ServiceName.category, category.CategoryID);

            let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

            let observables = this.http.delete<Category>(
                    endpoint, 
                    { headers: headers, observe: 'response'} )
                .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

            return observables;
        }
    }
}
