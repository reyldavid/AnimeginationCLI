import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AdminGuard } from '../guards/admin.guard';
import { MediumComponent } from './medium/medium.component';
import { GenreComponent } from './genre/genre.component';
import { GenreEditComponent } from '../admin/genre-edit/genre-edit.component';
import { GenreAddComponent } from '../admin/genre-add/genre-add.component';
import { AdminRouterModule } from '../admin/admin-router/admin-router.module';
import { MediumEditComponent } from './medium-edit/medium-edit.component';
import { MediumAddComponent } from './medium-add/medium-add.component';
import { PublisherComponent } from './publisher/publisher.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ListingComponent } from './listing/listing.component';
import { CustomerNoteComponent } from './customer-note/customer-note.component';
import { UserFeedbackComponent } from './user-feedback/user-feedback.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule, FormsModule, ReactiveFormsModule, 
    HttpClientModule, AngularFontAwesomeModule,
    AdminRouterModule
  ],
  declarations: [
    GenreComponent,
    GenreEditComponent, 
    GenreAddComponent,
    MediumComponent,
    MediumEditComponent,
    MediumAddComponent,
    PublisherComponent,
    UserInfoComponent,
    ProductInfoComponent,
    ListingComponent,
    CustomerNoteComponent,
    UserFeedbackComponent
  ],
  providers: [
    AdminGuard
  ],
  exports: [
    BrowserModule, FormsModule, ReactiveFormsModule, 
    HttpClientModule, AngularFontAwesomeModule,
    GenreComponent,
    GenreEditComponent, 
    GenreAddComponent,
    MediumComponent,
    MediumEditComponent,
    MediumAddComponent,
    PublisherComponent,
    UserInfoComponent,
    ProductInfoComponent,
    ListingComponent,
    CustomerNoteComponent,
    UserFeedbackComponent
  ]
})
export class AdminModule { }
