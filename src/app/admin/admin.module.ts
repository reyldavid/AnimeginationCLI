import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DpDatePickerModule } from 'ng2-date-picker';

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
import { PublisherAddComponent } from '../admin/publisher-add/publisher-add.component';
import { PublisherEditComponent } from '../admin/publisher-edit/publisher-edit.component';
import { UserInfoEditComponent } from '../admin/user-info-edit/user-info-edit.component';
import { ProductInfoEditComponent } from '../admin/product-info-edit/product-info-edit.component';
import { ListingEditComponent } from '../admin/listing-edit/listing-edit.component';
import { ListingAddComponent } from '../admin/listing-add/listing-add.component';
import { ProductInfoAddComponent } from '../admin/product-info-add/product-info-add.component';
import { ListTypeComponent } from '../admin/list-type/list-type.component';
import { RecommendationsComponent } from '../admin/recommendations/recommendations.component';
import { RecommendAddComponent } from '../admin/recommend-add/recommend-add.component';
import { RecommendEditComponent } from '../admin/recommend-edit/recommend-edit.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule, FormsModule, ReactiveFormsModule, 
    HttpClientModule, AngularFontAwesomeModule,
    AdminRouterModule, DpDatePickerModule
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
    UserFeedbackComponent,
    PublisherAddComponent,
    PublisherEditComponent,
    UserInfoEditComponent,
    ProductInfoEditComponent,
    ListingEditComponent,
    ListingAddComponent,
    ProductInfoAddComponent,
    ListTypeComponent,
    RecommendationsComponent,
    RecommendAddComponent,
    RecommendEditComponent
  ],
  providers: [
    AdminGuard
  ],
  exports: [
    BrowserModule, FormsModule, ReactiveFormsModule, 
    HttpClientModule, AngularFontAwesomeModule,
    DpDatePickerModule,
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
    UserFeedbackComponent,
    RecommendationsComponent
  ]
})
export class AdminModule { }
