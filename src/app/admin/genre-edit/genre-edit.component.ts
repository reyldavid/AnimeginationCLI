import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../models/category';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { CategoryService } from '../../services/categories.service';
import { MessageService } from '../../services/message.service';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.css']
})
export class GenreEditComponent implements OnInit, OnDestroy {

  genreModel: Category = { CategoryID: 0, CategoryName: "", ImageFile: "", Description: "" };
  submitted: boolean = false;
  genreID: number;
  genreSubscription: Subscription;

  constructor(private genreService: CategoryService, 
              private sessionService: SessionService, 
              private messageService: MessageService, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('genre edit init');
    this.route.paramMap.subscribe(params => {
      let genreIDparam = Number(params.get('categoryID'));

      if (genreIDparam) {
        this.genreID = genreIDparam;
        // this.getGenre();
      }
    })

    this.route.queryParams.subscribe(params => {
        this.genreID = params.categoryID;

        if (this.genreID) {
          // this.getGenre();
        }
    })
    this.genreSubscription = this.genreService.getAnimeCategory(this.genreID).subscribe(item => {
      this.genreModel = item;
      this.messageService.setSpinner(false);
    })
  }

  ngOnDestroy() {
    this.genreSubscription.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;

    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;

      this.genreService.updateCategory(token, this.genreModel)
        .subscribe(genre => {
          console.log("aya genre ", genre);
          this.messageService.setSpinner(false);
        }, 
        (error) => {
          this.messageService.setSpinner(false);
          console.log("Error updating genre: ", error);
        })
    }
  }

}


