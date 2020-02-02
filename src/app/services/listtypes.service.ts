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
import { ServiceName } from '../models/service';
import { ListType } from '../models/listtype';
import { ListTypeCache } from '../models/dictionary';
import 'rxjs/Rx';
// import { Subscription } from 'rxjs/Subscription';
// import { MessageService } from '../services/message.service';
//import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
  })
  export class ListTypeService {

    private _animeListType = new ListTypeCache();
    private _listTypes: ListType[] = []; 

    constructor(private http: HttpClient, 
        private globals: Globals, 
        private helper: HttpHelper) {
        // private messageService: MessageService) {
    }

    get ListTypes(): ListType[] {
        return this._listTypes;
    }
    set ListTypes(listTypes: ListType[]) {
        this._listTypes = listTypes;
    }

    setListTypesCache(data: ListType[]) {
        if (!this._animeListType[0]) {
        this._animeListType[0] = data;
        this._listTypes = data;
        }
    }

    setListTypeCache(data: ListType, id: number) {
        if (!this._animeListType[id]) {
            this._animeListType[id] = data;
        }
    }

    getAnimeListTypeStatic(): Observable<ListType[]> {
        let endpoint = 'assets/listtypes.data.json';

        let result = this.http.get<ListType[]>(
            endpoint
        )
        .pipe( catchError( HttpHelper.handleError ));

        return result;
    }

    getAnimeListTypes(): Observable<ListType[]> {

        if (this.globals.localData) {
            // return this.getAnimeListTypeStatic()[0];
            return of(null);
        }
        else {
            if (this._listTypes && this._listTypes.length > 0) {
                
                return of(this._listTypes);
            }
            else {
                // this.messageService.setSpinner(true);                
                let endpoint = this.helper.getEndPoint(ServiceName.listType);
                let headers: HttpHeaders = this.helper.getContentHeaders();
    
                let observables = this.http.get<ListType[]>(
                    endpoint, { headers: headers, observe: 'response'}
                    )
                    .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

                return observables;
            }
        }
    }

    getAnimeListType(listTypeID: number): Observable<ListType> {

        if (this.globals.localData) {
            // return this.getAnimeListTypeStatic()[0];
            return of(null);
        }
        else {
            if (this._animeListType && this._animeListType[listTypeID]) {
                
                return of(this._animeListType[listTypeID]);
            }
            else {
                // this.messageService.setSpinner(true);                
                let endpoint = this.helper.getEndPoint(ServiceName.listType, listTypeID);

                let headers: HttpHeaders = this.helper.getContentHeaders();
    
                let observables = this.http.get<ListType>(
                    endpoint, { headers: headers, observe: 'response'}
                    )
                    .pipe( map ( HttpHelper.extractData), catchError( HttpHelper.handleError ));

                return observables;
            }
        }

    }
}
