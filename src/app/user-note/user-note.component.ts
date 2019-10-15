import { Component, OnInit } from '@angular/core';
import { UserNoteModel } from '../models/userNoteModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { TokenModel } from '../models/tokenmodel';
import { UserNoteService } from '../services/userNotes.service';
import { MessageService } from '../services/message.service';

export interface CorrespondenceType {
  typeID: number, 
  typeCode: string,
  description: string
}
@Component({
  selector: 'app-user-note',
  templateUrl: './user-note.component.html',
  styleUrls: ['./user-note.component.css']
})
export class UserNoteComponent implements OnInit {

  noteModel: UserNoteModel = { correspondenceType: "thanks", title: "", note: "" };
  submitted: boolean = false;
  isSuccess: boolean = false;
  isFailure: boolean = false;
  errorMessage: string;

  correspondenceTypes: CorrespondenceType[] = [
    { typeID: 0, typeCode: "thanks", description: "Thank You" },
    { typeID: 1, typeCode: "feedback", description: "Offering Feedback" }, 
    { typeID: 2, typeCode: "problem", description: "Problem with Shipment" }, 
    { typeID: 3, typeCode: "canOrder", description: "Cancel Order" }, 
    { typeID: 4, typeCode: "canItem", description: "Cancel Item" }, 
    { typeID: 5, typeCode: "other", description: "Other" }
  ];

  constructor(private userNoteService: UserNoteService, 
              private sessionService: SessionService, 
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

    if (this.sessionService.isAuthenticated()) {
      let token = this.sessionService.UserToken;
    
      this.userNoteService.addUserNote(token, this.noteModel).subscribe(userNote => {
        console.log("aya user note ", userNote);
        this.messageService.setSpinner(false);
      }, 
      (error) => {
        this.messageService.setSpinner(false);
        console.log("Error creating user note: ", error);
      })
    }
  }

}