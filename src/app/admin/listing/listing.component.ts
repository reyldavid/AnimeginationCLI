import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../services/listings.service';
import { Listing } from '../../models/listing';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  listings: Listing[] = [];

  constructor( private router: Router,
               private listingsService: ListingService, 
               private sessionService: SessionService, 
               private messageService: MessageService ) { }

  ngOnInit() {
    this.listingsService.getAnimeListings().subscribe(listings => {
      this.listings = listings;
      this.listingsService.Listings = listings;
    })
  }

  OnEditListing(listing: Listing) {
    console.log('listing ID: ' + listing.ListingID);
    this.router.navigate(['/listing-edit'], { queryParams: {  listingID: listing.ListingID } });
  }

  OnDeleteListing(listing: Listing) {
    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;

      this.listingsService.deleteListing(token, listing).subscribe(item => {
        this.messageService.setSpinner(false);
        console.log("aya deleted listing ", item);
      })
    }
  }

}


