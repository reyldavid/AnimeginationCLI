/**
* Created by reynaldodavid on 9/08/18.
*/
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// import { catchError } from "rxjs/operators/catchError";
import { Globals } from '../globals';
import { environment } from "../../environments/environment";
import { ServiceName } from '../models/service';
import { TokenModel } from "../models/tokenmodel";

@Injectable()
export class HttpHelper {

    constructor(private globals: Globals) {

    }

    public static extractData(res: HttpResponse<any>) {

        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let body: any = res.body;

        return body || {};
    }

    public static extractFirst(res: HttpResponse<any>) {

        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let body: any = res.body[0];

        console.log(body);
        return body || {};
    }

    public static handleError(error: HttpErrorResponse) {
        let errMsg = (error.message) ? error.message :
            error.status ? error.status :
                error.statusText ? error.statusText :
                    error.url ? error.url :
                        error.error ? error.error.message :
                            'Server error';
        console.log('API error: ' + errMsg);
        console.log(error);
        return Observable.throw(error.error ? error.error : errMsg);
    }

    public getContentHeaders(): HttpHeaders {

        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('AnimeApiClientKey', this.globals.animeApiClientKey);

        return headers;
    }

    public getProxyHeaders(): HttpHeaders {

        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('X-Requested-With', 'XMLHttpRequest');

        return headers;
    }

    public getSecureContentHeaders(token: TokenModel): HttpHeaders {

        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('AnimeApiClientKey', this.globals.animeApiClientKey)
            .set('JWTToken', token.token);

        return headers;
    }

    public getEndPoint(service: ServiceName, id?: number) {
        let segment = id ? service + '/' + id : service;
        let requestUrl = environment.useAzure ? environment.azureHostUrl : environment.localHostUrl;
        // let endpoint = environment.proxyUrl + requestUrl + segment;
        let endpoint = requestUrl + segment;

        if (environment.useNgProxy) {
            endpoint = '/v1/' + service;
            endpoint = id ? endpoint + '/' + id : endpoint;
        }
        console.log('service: ' + service + '    endpoint: ' + endpoint);
        return endpoint;
    }

    public getSearchEndPoint(service: ServiceName, searchText: string) {
        let segment = service + '/' + searchText;
        let requestUrl = environment.useAzure ? environment.azureHostUrl : environment.localHostUrl;
        // let endpoint = environment.proxyUrl + requestUrl + segment;
        let endpoint = requestUrl + segment;

        if (environment.useNgProxy) {
            endpoint = '/v1/' + service + '/' + searchText;
        }
        console.log('service: ' + service + '    endpoint: ' + endpoint);
        return endpoint;
    }

    public getCompoundEndPoint(service: ServiceName, secondary: ServiceName, id?: number) {
        let segment = service + '/' + secondary;
        segment = id ? segment + '/' + id : segment;
        let requestUrl = environment.useAzure ? environment.azureHostUrl : environment.localHostUrl;
        // let endpoint = environment.proxyUrl + requestUrl + segment;
        let endpoint = requestUrl + segment;

        if (environment.useNgProxy) {
            endpoint = '/v1/' + segment;
            endpoint = id ? endpoint + '/' + id : endpoint;
        }
        console.log('service: ' + segment + '    endpoint: ' + endpoint);
        return endpoint;
    }

    public getComplexEndPoint(service: ServiceName, secondary: ServiceName, id: number, type: string) {
        let segment = service + '/' + secondary + '/' + id + '/' + type;
        let requestUrl = environment.useAzure ? environment.azureHostUrl : environment.localHostUrl;
        // let endpoint = environment.proxyUrl + requestUrl + segment;
        let endpoint = requestUrl + segment;

        if (environment.useNgProxy) {
            endpoint = '/v1/' + segment;
        }
        console.log('service: ' + segment + '    endpoint: ' + endpoint);
        return endpoint;
    }

    // public getDatesQueryParameters(appId?: string) {

    //     let startEpoch = this.dateService.startDate.getTime().toString();
    //     let endEpoch = this.dateService.endDate.getTime().toString();

    //     // We need to pad the End Date by One (1) Day because any given date is time stamped 
    //     // at 12:00AM which would cover none of the rest of the day 
    //     let tempDate = new Date(this.dateService.endDate.valueOf());
    //     tempDate.setUTCDate(tempDate.getUTCDate() + 1);
    //     endEpoch = tempDate.getTime().toString();        
  
    //     let queryString = '?startdate=' + startEpoch + '&enddate=' + endEpoch;

    //     queryString = appId ? '/' + appId + queryString : '/' + queryString;

    //     return queryString;
    // }

}
