/**
* Created by reynaldodavid on 6/30/2019.
*/
import { Observable } from 'rxjs';
import { of } from "rxjs/observable/of";
import { map } from 'rxjs/operators';
import { catchError } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Globals } from "../globals";
import { ServiceName } from '../models/service';
import 'rxjs/Rx';

@Injectable({
    providedIn: 'root'
  })
  export class UtilityService {

    constructor(private globals: Globals) {
    }

    formatDate(rawDate) {
        let options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        let formattedDate = rawDate.toLocaleDateString("en-US", options);
        return formattedDate;
    }

    getShippingDate(): string {
        let businessDays = this.globals.deliveryDays; // takes this many business days to deliver
        let counter = 1; // set to 1 to count from next business day
        let tmpDate = new Date();
        while ( businessDays > 0 ) {
            tmpDate = new Date();
            counter++;
            tmpDate.setDate( tmpDate.getDate() + counter );
            switch ( tmpDate.getDay() ){
                    case 0: 
                    case 6: 
                        break;// sunday & saturday
                    default:
                        businessDays--;
                    }; 
        }
        let shipDate = this.formatDate(tmpDate);
        console.log("aya ship date ", shipDate)
        return shipDate;
    }

}
