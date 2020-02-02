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
import { ApiProduct, Product } from '../models/product';
import { TokenModel } from '../models/tokenmodel';
import { ApiProductCache, ApiProductsCache } from '../models/dictionary';
// import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../services/message.service';
import { MediaService } from '../services/media.service';
import { CategoryService } from '../services/categories.service';
import { PublishersService } from '../services/publishers.service';
//import 'rxjs/add/operator/map';
import { Medium } from '../models/medium';
import { Category } from '../models/category';
import { Publisher } from '../models/publisher';
import { reject } from 'q';
import 'rxjs/Rx';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
  })
  export class ProductsService {

    token: TokenModel;

    private _animeProduct = new ApiProductCache();
    private _animeProducts = new ApiProductsCache();

    constructor(private http: HttpClient, 
        private globals: Globals, 
        private helper: HttpHelper, 
        private messageService: MessageService,
        private genreService: CategoryService,
        private mediaService: MediaService,
        private publisherService: PublishersService ) {
    }

    setProductsCache(data: ApiProduct[]) {
        if (!this._animeProducts[0]) {
            this._animeProducts[0] = data;
        }
        let __this = this;
        _.map(data, function(prod: ApiProduct) {
            __this._animeProduct[prod.ProductID] = prod;
        })
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
                
                return of(this._animeProducts[0]);
            }
            else {
                this.messageService.setSpinner(true);                
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
                
                return of(this._animeProduct[productID]);
            }
            else {
                this.messageService.setSpinner(true);
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

  updateProduct(token: TokenModel, product: Product): Observable<Product> {

      if (this.globals.localData) {
      }
      else {
          this.messageService.setSpinner(true);
          let body = JSON.stringify(product);

          let endpoint = this.helper.getEndPoint(ServiceName.product);

          let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

          let observables = this.http.put<Product>(
                  endpoint, body, 
                  { headers: headers, observe: 'response'} )
              .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

          return observables;
      }
  }

  addProduct(token: TokenModel, productItem: Product): Observable<Product> {

    if (this.globals.localData) {
    }
    else {
        this.messageService.setSpinner(true);
        let endpoint = this.helper.getEndPoint(ServiceName.product);

        let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

        let body = JSON.stringify(productItem);

        let observables = this.http.post<ApiProduct>(
            endpoint, body, { headers: headers, observe: 'response'}
            )
            .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

        return observables;
    }
  }

  deleteProduct(token: TokenModel, id: number): Observable<Product> {

    if (this.globals.localData) {
    }
    else {
        this.messageService.setSpinner(true);
        let endpoint = this.helper.getEndPoint(ServiceName.product, id);

        let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

        let observables = this.http.delete<ApiProduct>(
                endpoint, 
                { headers: headers, observe: 'response'} )
            .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

        return observables;
    }
  }

  convertProduct(apiProduct: ApiProduct): Product {

    let medium: Medium = _.find(this.mediaService.Media, function(m) {
        return m.MediumName == apiProduct.MediumName;
    })

    let genre: Category = _.find(this.genreService.Categories, function(g) {
        return g.CategoryName == apiProduct.CategoryName;
    })

    let publisher: Publisher = _.find(this.publisherService.Publishers, function(p) {
        return p.PublisherName == apiProduct.PublisherName;
    })

    let product: Product = {
        productid: apiProduct.ProductID,
        productcode: apiProduct.ProductCode,
        producttitle: apiProduct.ProductTitle,
        productdescription: apiProduct.ProductDescription,
        unitprice: apiProduct.UnitPrice,
        yourprice: apiProduct.YourPrice,
        categoryid: genre.CategoryID,
        productagerating: apiProduct.ProductAgeRating,
        productlength: apiProduct.ProductLength,
        productyearcreated: apiProduct.ProductYearCreated,
        mediumid: medium.MediumID,
        publisherid: publisher.PublisherID,
        ratingid: apiProduct.RatingID
    }
    return product;

    // const promiseMedium = new Promise<Medium>((resolve, reject) => {
    //     let medium: Medium = _.find(this.mediaService.Media, function(m) {
    //         return m.MediumName == apiProduct.MediumName;
    //     })
    //     resolve(medium);  
    // })

    // const promiseGenre = new Promise<Category>((resolve, reject) => {
    //     let genre: Category = _.find(this.genreService.Categories, function(g) {
    //         return g.CategoryName == apiProduct.CategoryName;
    //     })
    //     resolve(genre);
    // })

    // const promisePublisher = new Promise<Publisher>((resolve, reject) => {
    //     let publisher: Publisher = _.find(this.publisherService.Publishers, function(p) {
    //         return p.PublisherName == apiProduct.PublisherName;
    //     })
    // })

    // promiseMedium.then(medium => {
    //     promiseGenre.then(genre => {
    //         promisePublisher.then(publisher => {

    //             let product: Product = {
    //                 productid: apiProduct.ProductID,
    //                 productcode: apiProduct.ProductCode,
    //                 producttitle: apiProduct.ProductTitle,
    //                 productdescription: apiProduct.ProductDescription,
    //                 unitprice: apiProduct.UnitPrice,
    //                 yourprice: apiProduct.YourPrice,
    //                 categoryid: genre.CategoryID,
    //                 productagerating: apiProduct.ProductAgeRating,
    //                 productlength: apiProduct.ProductLength,
    //                 productyearcreated: apiProduct.ProductYearCreated,
    //                 mediumid: medium.MediumID,
    //                 publisherid: publisher.PublisherID,
    //                 ratingid: apiProduct.RatingID
    //             }
    //             console.log("aya pr 1 ", product);
    //             return product;
    //         })
    //     }).then(pr => {console.log("aya pr 2", pr); return pr})
    // }).then(pr => {console.log("aya pr 3", pr); return pr});

    // return null;
  }

}
