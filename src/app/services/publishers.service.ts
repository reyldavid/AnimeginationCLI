import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from "rxjs/observable/of";
import { map } from 'rxjs/operators';
import { catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from "../globals";
import { HttpHelper } from './http.helper.service';
import { ServiceName } from '../models/service';
import { Publisher } from '../models/publisher';
import { PublisherCache } from '../models/dictionary';
import { MessageService } from '../services/message.service';
import { TokenModel } from '../models/tokenmodel';
import 'rxjs/Rx';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {

  private _animePublishers = new PublisherCache();
  private _publishers: Publisher[] = [];

  constructor(private http: HttpClient, 
    private globals: Globals, 
    private helper: HttpHelper, 
    private messageService: MessageService) {
  }

  setPublishersCache(data: Publisher[]) {
    if (!this._animePublishers[0]) {
      this._animePublishers[0] = data;
      this._publishers = data;
    }
    // this._animePublishers = data;
  }

  get Publishers(): Publisher[] {
    return this._publishers;
  }

  set Publishers(publishers: Publisher[]) {
    this._publishers = publishers;
  }

  getPublishers(): Observable<Publisher[]> {
    if (this.globals.localData) {
      return of(null);
    }
    else {
      if (this._publishers && (this._publishers.length > 0)) {
          return of(this._publishers);
      }
      else {
          let endpoint = this.helper.getEndPoint(ServiceName.publishers);

          let headers: HttpHeaders = this.helper.getContentHeaders();

          let observables = this.http.get<Publisher[]>(
              endpoint, { headers: headers, observe: 'response'}
              )
              .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

          return observables;
      }
    }
  }

  getPublisherById(publisherId: number): Observable<Publisher> {
    if (this.globals.localData) {
      return of(null);
    }
    else {
      if (this._publishers && this._publishers.length > 0) {
        let publishers = _.find(this._animePublishers, function(item) {
          return item.PublisherID == publisherId;
        } ) 
        return of(publishers);
      }
      else {
    // this.messageService.setSpinner(true);
        let endpoint = this.helper.getEndPoint(ServiceName.publishers, publisherId);

        let headers: HttpHeaders = this.helper.getContentHeaders();

        let observables = this.http.get<Publisher>(
            endpoint, { headers: headers, observe: 'response'}
            )
            .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

        return observables;
      }
    }
  }

  updatePublisher(token: TokenModel, publisher: Publisher): Observable<Publisher> {

      if (this.globals.localData) {
      }
      else {
          this.messageService.setSpinner(true);
          let body = JSON.stringify(publisher);

          let endpoint = this.helper.getEndPoint(ServiceName.publishers);

          let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

          let observables = this.http.post<Publisher>(
                  endpoint, body, 
                  { headers: headers, observe: 'response'} )
              .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

          return observables;
      }
  }

  addPublisher(token: TokenModel, publisherItem: Publisher): Observable<Publisher> {

    if (this.globals.localData) {
    }
    else {
        this.messageService.setSpinner(true);
        let endpoint = this.helper.getEndPoint(ServiceName.publishers);

        let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

        let body = JSON.stringify(publisherItem);

        let observables = this.http.put<Publisher>(
            endpoint, body, { headers: headers, observe: 'response'}
            )
            .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

        return observables;
    }
  }

  deletePublisher(token: TokenModel, publisher: Publisher): Observable<Publisher> {

    if (this.globals.localData) {
    }
    else {
        this.messageService.setSpinner(true);
        let endpoint = this.helper.getEndPoint(ServiceName.publishers, publisher.PublisherID);

        let headers: HttpHeaders = this.helper.getSecureContentHeaders(token);

        let observables = this.http.delete<Publisher>(
                endpoint, 
                { headers: headers, observe: 'response'} )
            .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

        return observables;
    }
  }

}
