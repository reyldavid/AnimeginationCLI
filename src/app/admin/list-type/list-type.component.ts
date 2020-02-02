import { Component, OnInit } from '@angular/core';
import { ListTypeService } from '../../services/listtypes.service';
import { ListType } from '../../models/listtype';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-list-type',
  templateUrl: './list-type.component.html',
  styleUrls: ['./list-type.component.css']
})
export class ListTypeComponent implements OnInit {

  listTypes: ListType[] = [];

  constructor( private router: Router,
               private listTypesService: ListTypeService, 
               private messageService: MessageService ) { }

  ngOnInit() {
    this.listTypesService.getAnimeListTypes().subscribe(listTypes => {
      this.listTypes = listTypes;
      this.listTypesService.setListTypesCache(listTypes);
    })
  }

  OnEditListType(listType: ListType) {
    this.router.navigate(['/list-type-edit'], { queryParams: {  listTypeID: listType.ListTypeID } });
  }

}


