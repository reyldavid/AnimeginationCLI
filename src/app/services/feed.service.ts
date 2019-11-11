import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Globals } from "../globals";
import { HttpHelper } from './http.helper.service';
import { Feed } from '../models/feed';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient, 
    private globals: Globals, 
    private messageService: MessageService,
    private helper: HttpHelper) {
  }

  private extractFeeds(res: any): Feed {
    // let feed = res.json();
    let feed = res;
    return feed || { };
  }

  getFeedContent(url: string): Observable<Feed> {

    this.messageService.setSpinner(true);

    let endpoint = environment.proxyUrl + this.globals.rss2JsonServiceUrl + url;

    let headers: HttpHeaders = this.helper.getProxyHeaders();

    let observables = this.http.get(endpoint, 
      { headers: headers } )
        .pipe( map ( this.extractFeeds ), 
        catchError( HttpHelper.handleError ));

    // return this.http.get(endpoint)
    //         .map(this.extractFeeds)
    //         .catch(this.handleError);
    return observables;
  }

}
