import { Component, OnInit } from '@angular/core';
import { UserNoteModel } from '../../models/userNoteModel';
import { SessionService } from '../../services/session.service';
import { UserNoteService } from '../../services/userNotes.service';
import { MessageService } from '../../services/message.service';

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
    { typeID: 0, typeCode: "ThankYou", description: "Thank You" },
    { typeID: 1, typeCode: "OfferingFeedback", description: "Offering Feedback" }, 
    { typeID: 2, typeCode: "ProblemWithShipment", description: "Problem with Shipment" }, 
    { typeID: 3, typeCode: "CancelOrder", description: "Cancel Order" }, 
    { typeID: 4, typeCode: "CancelItem", description: "Cancel Item" }, 
    { typeID: 5, typeCode: "ReturnAuthNumber", description: "Request for Return Authorization Number" }, 
    { typeID: 6, typeCode: "Other", description: "Other" }
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
        this.messageService.setSpinner(false);
      }, 
      (error) => {
        this.messageService.setSpinner(false);
        console.log("Error creating user note: ", error);
      })
    }
  }

}
