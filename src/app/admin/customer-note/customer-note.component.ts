import { Component, OnInit } from '@angular/core';
import { UserNoteService } from '../../services/userNotes.service';
import { CustomerNote } from '../../models/customerNote';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-customer-note',
  templateUrl: './customer-note.component.html',
  styleUrls: ['./customer-note.component.css']
})
export class CustomerNoteComponent implements OnInit {

  userNotes: CustomerNote[] = [];

  constructor( private router: Router,
               private userNotesService: UserNoteService, 
               private sessionService: SessionService, 
               private messageService: MessageService ) { }

  ngOnInit() {
    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;

      this.userNotesService.getUserNotes(token).subscribe(userNotes => {
        this.userNotes = userNotes;
        this.messageService.setSpinner(false);
      })
    }
  }

  OnDeleteUserNote(customerNote: CustomerNote) {
    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;

      this.userNotesService.deleteUserNote(token, customerNote.noteId).subscribe(item => {
        this.messageService.setSpinner(false);
        console.log("aya deleted user Note ", item);
      }, 
      (error) => {
        this.messageService.setSpinner(false);
        console.log("Error deleting user Note: ", error);
    })
    }
  }

}

