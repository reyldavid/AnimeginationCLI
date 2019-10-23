import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/categories.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    public categories: Category[];

    constructor(private _categoryService: CategoryService,
        private _router: Router, 
        private _messageService: MessageService ) {
    }

    OnSelectCategory(category: Category) {
        console.log('category: ' + category.Description);
        this._router.navigate(['/category-list'], { queryParams: {  categoryID: category.CategoryID } });
        // this._router.navigate(['/category-list']);
    }

    GetCategories() {
        this._categoryService.getAnimeCategories()
            .subscribe(
              (categories: Category[]) => {
                this.categories = categories;

                this._messageService.setSpinner(false);
              });
    }

    ngOnInit(): any {
        console.log('categories init');
        this.GetCategories();
    }
}