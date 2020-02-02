import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiProduct } from '../models/product';
import { SearchService } from '../services/search.service';
import { MessageService } from '../services/message.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  products: ApiProduct[];
  searchText: string;
  count: number;
  showResults: boolean = false;

  constructor(private _router: Router, 
      private _route: ActivatedRoute, 
      private _searchService: SearchService, 
      private _cartService: CartService, 
      private _messageService: MessageService ) {
   }

  ngOnInit(): any {
    this._route.queryParams.subscribe(params => {

      if (params.searchText) {
        this.searchText = params.searchText;
  
        this.GetProducts(this.searchText);
        }
    })

    this._route.paramMap.subscribe(params => {
      let searchText = params.get('searchText');
  
      if (searchText) {
        this.searchText = searchText;
        this.GetProducts(searchText);
      }
    })
  }
  
  GetProducts(searchText: string) {
    this.showResults = false;
    this._searchService.getAnimeSearch(searchText)
        .subscribe((apiProducts: ApiProduct[]) => {

          this.showResults = true;
          this.products = apiProducts;
          this.count = apiProducts.length;

          this._searchService.setSearchCache(apiProducts, searchText);
          this._messageService.setSpinner(false);
        });
  }

  OnSelectProduct(product: ApiProduct) {
    // this._router.navigate(['/detail'], { queryParams: { productID: product.ProductID } });
    this._cartService.addVisitHistory(product.ProductID).subscribe(item => {
    })
  }

}
