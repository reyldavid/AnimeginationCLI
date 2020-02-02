/**
* Created by reynaldodavid on 6/30/2019.
*/
import { Injectable } from '@angular/core';
import { Globals } from "../globals";
import { Order } from '../models/orderModel';
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

    formatCalendarDate(inDate: string): string {
        const months = ["January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"];
        let rawDate = new Date(inDate);
        let formatted = months[rawDate.getMonth()] + " " + rawDate.getDate() 
            + ", " + rawDate.getFullYear();
        return formatted;
    }

    getShippingDate(orderDate?: string): string {
        let businessDays = this.globals.deliveryDays; // takes this many business days to deliver
        let counter = 1; // set to 1 to count from next business day
        let tmpDate = new Date();
        while ( businessDays > 0 ) {
            tmpDate = orderDate ? new Date(orderDate) : new Date();
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
        return shipDate;
    }

    isInTransit(orderDate: string) : boolean {
        let today = new Date();
        let shippingDate = this.getShippingDate(orderDate);
        let shipDate = new Date(shippingDate);
        return today < shipDate;
    }

    getOrderNumber(order: Order): string {
        let orderNumber = "";
        if (order) {
            let prefix = this.globals.orderPrefix;
            orderNumber = prefix.substring(0, prefix.length - order.orderID.toString().length);

            orderNumber = orderNumber + order.orderID;
        }
        return orderNumber;
    }

    getTrackingNumber(): string {
        let random = Math.floor(Math.random() * 1000);
        let trackingNumber = this.globals.trackingPrefix + random;

        return trackingNumber;
    }

    SplitCamelCase(camelCase: string): string {
        let parsed = camelCase.replace(/([a-z])([A-Z])/g, "$1 $2");
        return parsed;
    }

}
