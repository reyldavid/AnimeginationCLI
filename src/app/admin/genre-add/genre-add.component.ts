import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { CategoryService } from '../../services/categories.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-genre-add',
  templateUrl: './genre-add.component.html',
  styleUrls: ['./genre-add.component.css']
})
export class GenreAddComponent implements OnInit {

  genreModel: Category = { CategoryID: 0, CategoryName: "", ImageFile: "", Description: "" };
  submitted: boolean = false;

  constructor(private genreService: CategoryService, 
              private sessionService: SessionService, 
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

    if (this.sessionService.isAuthenticated()) {
      let token = this.sessionService.UserToken;

      this.genreService.addCategory(token, this.genreModel)
        .subscribe(genre => {
          this.messageService.setSpinner(false);
        }, 
        (error) => {
          this.messageService.setSpinner(false);
          console.log("Error creating genre: ", error);
      })
    }
  }

}
