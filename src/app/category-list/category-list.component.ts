import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/categories.service';
import { Category } from '../models/category';
import { ApiProduct } from '../models/product';
import { MessageService } from '../services/message.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  products: ApiProduct[];
  category: string;

  constructor(private _router: Router, 
      private _route: ActivatedRoute, 
      private _categoryService: CategoryService, 
      private _cartService: CartService, 
      private _messageService: MessageService ) {
   }

  ngOnInit(): any {
    this._route.queryParams.subscribe(params => {
      let categoryID = params.categoryID;

      if (categoryID) {
        this.GetCategory(categoryID);
        this.GetProducts(categoryID);
      }
    })
  }

  OnSelectProduct(product: ApiProduct) {
    // this._router.navigate(['/detail'], { queryParams: { productID: product.ProductID } });

    this._cartService.addVisitHistory(product.ProductID).subscribe(item => {
    }, (error) => {
      console.log("Error adding history", error);
    })


}

  GetCategory(categoryID: number) {
      this._categoryService.getAnimeCategory(categoryID)
          .subscribe(
            (category: Category) => {
              this.category = category.Description;              
            });
  }

  GetProducts(categoryId: number) {
    this._categoryService.getAnimeCategoryList(categoryId)
      .subscribe(
        (products: ApiProduct[]) => {
          this.products = products;              

          this._messageService.setSpinner(false);
      });
  }
}
