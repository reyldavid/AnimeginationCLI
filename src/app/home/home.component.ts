import { Component, OnInit } from '@angular/core';
import { ListingType } from '../models/listingTypes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    featuredTitles: number = ListingType.FeaturedTitles;
    newItems: number = ListingType.NewItems;
    topSellers: number = ListingType.TopSellers;
    bargainBin: number = ListingType.BargainBin;
    closeOut: number = ListingType.CloseOut;
    liveAction: number = ListingType.LiveAction;
    recommendations: number = ListingType.Recommendations;
    onSale: number = ListingType.OnSale;

    ngOnInit(): any {
        console.log('home init');
        console.log('home href ' + window.location.href);
        console.log('home path ' + window.location.pathname);
    }
}