import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/categories.service';
import { Category } from '../models/category';
import { ApiProduct } from '../models/product';
import { MessageService } from '../services/message.service';

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
      private _messageService: MessageService ) {
   }

  ngOnInit(): any {
    console.log('category list init');

    this._route.queryParams.subscribe(params => {
      let categoryID = params.categoryID;

      console.log('aya categoryID');
      console.log(categoryID);

      this.GetCategory(categoryID);
      this.GetProducts(categoryID);
    })
  }

  OnSelectProduct(product: ApiProduct) {
    console.log('category product ID: ' + product.ProductID);
    this._router.navigate(['/detail'], { queryParams: { productID: product.ProductID } });
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
