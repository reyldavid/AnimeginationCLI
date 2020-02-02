import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from "rxjs/observable/of";
import { map } from 'rxjs/operators';
import { catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from "../globals";
import { HttpHelper } from './http.helper.service';
import { ServiceName } from '../models/service';
import { Medium } from '../models/medium';
import { MediaCache } from '../models/dictionary';
import { MessageService } from '../services/message.service';
import { TokenModel } from '../models/tokenmodel';
import 'rxjs/Rx';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private _animeMedia = new MediaCache();
  private _media: Medium[] = [];

  constructor(private http: HttpClient, 
    private globals: Globals, 
    private helper: HttpHelper, 
    private messageService: MessageService) {
  }

  setMediaCache(data: Medium[]) {
    if (!this._animeMedia[0]) {
      this._animeMedia[0] = data;
      this._media = data;
    }
  }

  get Media(): Medium[] {
    return this._media;
  }
  set Media(media: Medium[]) {
    this._media = media;
  }

  // if (this._animeCategory && this._animeCategory[categoryId]) {
  //     return of(this._animeCategory[categoryId]);
  // }

  getMediaTypes(): Observable<Medium[]> {
    if (this.globals.localData) {
      return of(null);
    }
    else {
      if (this._media && (this._media.length > 0)) {
          return of(this._media);
      }
      else {
          // this.messageService.setSpinner(true);
          let endpoint = this.helper.getEndPoint(ServiceName.media);

          let headers: HttpHeaders = this.helper.getContentHeaders();

          let observables = this.http.get<Medium[]>(
              endpoint, { headers: headers, observe: 'response'}
              )
              .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

          return observables;
      }
    }
  }

  getMediaTypeById(mediumId: number): Observable<Medium> {
    if (this.globals.localData) {
      return of(null);
    }
    else {
      if (this._animeMedia && this._animeMedia[mediumId]) {
        let media = _.find(this._animeMedia, function(item) {
          return item.MediumID == mediumId;
        } ) 
        return of(media);
      }
      else {
    // this.messageService.setSpinner(true);
        let endpoint = this.helper.getEndPoint(ServiceName.media, mediumId);

        let headers: HttpHeaders = this.helper.getContentHeaders();

        let observables = this.http.get<Medium>(
            endpoint, { headers: headers, observe: 'response'}
            )
            .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

        return observables;
      }
    }
  }

  updateMedium(token: TokenModel, medium: Medium): Observable<Medium> {

      if (this.globals.localData) {
      }
      else {
          this.messageService.setSpinner(true);
          let body = JSON.stringify(medium);

          let endpoint = this.helper.getEndPoint(ServiceName.media);

          let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

          let observables = this.http.post<Medium>(
                  endpoint, body, 
                  { headers: headers, observe: 'response'} )
              .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

          return observables;
      }
  }

  addMedium(token: TokenModel, mediumItem: Medium): Observable<Medium> {

    if (this.globals.localData) {
    }
    else {
        this.messageService.setSpinner(true);
        let endpoint = this.helper.getEndPoint(ServiceName.media);

        let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

        let body = JSON.stringify(mediumItem);

        let observables = this.http.put<Medium>(
            endpoint, body, { headers: headers, observe: 'response'}
            )
            .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

        return observables;
    }
  }

  deleteMedium(token: TokenModel, medium: Medium): Observable<Medium> {

    if (this.globals.localData) {
    }
    else {
        this.messageService.setSpinner(true);
        let body = JSON.stringify(medium);

        let endpoint = this.helper.getEndPoint(ServiceName.media, medium.MediumID);

        let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

        let observables = this.http.delete<Medium>(
                endpoint, 
                { headers: headers, observe: 'response'} )
            .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

        return observables;
    }
  }

}
