import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    public categories: Category[];

    constructor(private _categoryService: CategoryService,
        private _router: Router) {
    }

    OnSelectCategory(category: Category) {
        console.log('category: ' + category.Description);
        this._router.navigate(['/genre'], { queryParams: {  categoryID: category.CategoryID } });
        // this._router.navigate(['/genre']);
    }

    GetCategories() {
        this._categoryService.getAnimeCategories()
            .subscribe(
              (categories: Category[]) => {
                this.categories = categories;              
              });
    }

    ngOnInit(): any {
        console.log('categories init');
        this.GetCategories();
    }
}