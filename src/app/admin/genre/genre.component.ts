import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  genres: Category[] = [];

  constructor( private router: Router,
               private categoryService: CategoryService,  
               private sessionService: SessionService, 
               private messageService: MessageService ) { }

  ngOnInit() {
    this.categoryService.getAnimeCategories().subscribe(genres => {
      this.genres = genres;
      this.categoryService.setCategoriesCache(genres);
      this.messageService.setSpinner(false);
    })
  }

  OnEditGenre(genre: Category) {
    console.log('category ID: ' + genre.CategoryID);
    this.router.navigate(['/genre-edit'], { queryParams: {  categoryID: genre.CategoryID } });
  }

  OnDeleteGenre(genre: Category) {
    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;

      this.categoryService.deleteCategory(token, genre).subscribe(item => {
        this.messageService.setSpinner(false);
        console.log("aya deleted genre ", item);
      })
    }
  }

}

