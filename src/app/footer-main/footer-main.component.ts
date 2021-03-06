import { Component, OnInit } from '@angular/core';
import { ListingType } from '../models/listingTypes';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-footer-main',
  templateUrl: './footer-main.component.html',
  styleUrls: ['./footer-main.component.css']
})
export class FooterMainComponent implements OnInit {

  featuredTitles: number = ListingType.FeaturedTitles;
  newItems: number = ListingType.NewItems;
  topSellers: number = ListingType.TopSellers;
  bargainBin: number = ListingType.BargainBin;
  closeOut: number = ListingType.CloseOut;
  liveAction: number = ListingType.LiveAction;
  recommendations: number = ListingType.Recommendations;
  onSale: number = ListingType.OnSale;
  footerSubscription: Subscription;
  show: boolean = true;

  constructor(private messageService: MessageService) {

        this.footerSubscription = messageService.getFooter().subscribe( show => {
            this.show = show;
        })
   }

  ngOnInit() {
  }

}
