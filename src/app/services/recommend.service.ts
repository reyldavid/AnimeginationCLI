import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from "rxjs/observable/of";
import { map } from 'rxjs/operators';
import { catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from "../globals";
import { HttpHelper } from './http.helper.service';
import { ServiceName } from '../models/service';
import { Recommendation } from '../models/recommendation';
import { RecommendsCache } from '../models/dictionary';
import { MessageService } from '../services/message.service';
import { TokenModel } from '../models/tokenmodel';
import 'rxjs/Rx';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RecommendsService {

  private _animeRecommends = new RecommendsCache();
  private _recommends: Recommendation[] = [];

  constructor(private http: HttpClient, 
    private globals: Globals, 
    private helper: HttpHelper, 
    private messageService: MessageService) {
  }

  setRecommendsCache(data: Recommendation[]) {
    if (!this._animeRecommends[0]) {
      this._animeRecommends[0] = data;
      this._recommends = data;
    }
  }

  get Recommendations(): Recommendation[] {
    return this._recommends;
  }

  set Recommendations(recommends: Recommendation[]) {
    this._recommends = recommends;
  }

  getRecommends(): Observable<Recommendation[]> {
    if (this.globals.localData) {
      return of(null);
    }
    else {
      if (this._recommends && (this._recommends.length > 0)) {
          return of(this._recommends);
      }
      else {
          let endpoint = this.helper.getEndPoint(ServiceName.recommendation);

          let headers: HttpHeaders = this.helper.getContentHeaders();

          let observables = this.http.get<Recommendation[]>(
              endpoint, { headers: headers, observe: 'response'}
              )
              .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

          return observables;
      }
    }
  }

  getRecommendById(recommendId: number): Observable<Recommendation> {
    if (this.globals.localData) {
      return of(null);
    }
    else {
      if (this._recommends && this._recommends.length > 0) {
        let recommends = _.find(this._recommends, function(item) {
          return item.recommendId == recommendId;
        } ) 
        return of(recommends);
      }
      else {
    // this.messageService.setSpinner(true);
        let endpoint = this.helper.getEndPoint(ServiceName.recommendation, recommendId);

        let headers: HttpHeaders = this.helper.getContentHeaders();

        let observables = this.http.get<Recommendation>(
            endpoint, { headers: headers, observe: 'response'}
            )
            .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

        return observables;
      }
    }
  }

  addRecommend(token: TokenModel, recommendItem: Recommendation): Observable<Recommendation> {

    if (this.globals.localData) {
    }
    else {
        this.messageService.setSpinner(true);
        let endpoint = this.helper.getEndPoint(ServiceName.recommendation);

        let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

        let body = JSON.stringify(recommendItem);

        let observables = this.http.put<Recommendation>(
            endpoint, body, { headers: headers, observe: 'response'}
            )
            .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

        return observables;
    }
  }

  deleteRecommend(token: TokenModel, recommend: Recommendation): Observable<Recommendation> {

    if (this.globals.localData) {
    }
    else {
        this.messageService.setSpinner(true);
        let endpoint = this.helper.getEndPoint(ServiceName.recommendation, recommend.recommendId);

        let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

        let observables = this.http.delete<Recommendation>(
                endpoint, 
                { headers: headers, observe: 'response'} )
            .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

        return observables;
    }
  }

}
