import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiProduct } from '../models/product';
import { SearchService } from '../services/search.service';

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
      private _searchService: SearchService ) {
   }

  ngOnInit(): any {
    console.log('search results init');

    this._route.queryParams.subscribe(params => {

      if (params.searchText) {
        this.searchText = params.searchText;
        console.log('aya search text');
        console.log(this.searchText);
  
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
        });
  }

  OnSelectProduct(product: ApiProduct) {
    console.log('product ID: ' + product.ProductID);
    this._router.navigate(['/detail'], { queryParams: { productID: product.ProductID } });
  }

}
