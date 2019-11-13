import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { Globals } from './globals';
import { HttpHelper } from './services/http.helper.service';
import { AppComponent } from './app.component';

import { AdminModule } from './admin/admin.module';
import { AdminRouterModule } from './admin/admin-router/admin-router.module';
import { CustomerRouterModule } from './customer/customer-router/customer-router.module';

import { ListTypeService } from './services/listtypes.service';
import { ProductsService } from './services/products.service';
import { ListingService } from './services/listings.service';
import { SearchService } from './services/search.service';
import { CategoryService } from './services/categories.service';
import { AccountService } from './services/accounts.service';
import { UserAccountsService } from './services/userAccounts.service';
import { CartService } from './services/cart.service';
import { OrderService } from './services/orders.service';
import { LoginService } from './services/login.service';
import { SessionService } from './services/session.service';
import { UtilityService } from './services/utilities.service';
import { UserNoteService } from './services/userNotes.service';
import { AuthorizationGuard } from './guards/authorization.guard';
import { ProductsResolve } from './guards/products-resolve.guard';
import { AppRouterModule } from './app-router/app-router.module';

import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './product/product.component';
import { ProductsSliceComponent } from './products-slice/products-slice.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProductSliceComponent } from './product-slice/product-slice.component';
import { CardsCarouselComponent } from './cards-carousel/cards-carousel.component';
import { ProductSlideComponent } from './product-slide/product-slide.component';
import { ShippingComponent } from './shipping/shipping.component';
import { SimilarsComponent } from './similars/similars.component';
import { FooterMainComponent } from './footer-main/footer-main.component';
import { ReturnsComponent } from './returns/returns.component';
import { LegalComponent } from './legal/legal.component';
import { RatingsComponent } from './ratings/ratings.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ShippingInfoComponent } from './shipping-info/shipping-info.component';
import { CustomerModule } from './customer/customer.module';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { StripHtmlTagsPipe } from './strip-html-tags/strip-html-tags.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    HomeComponent,
    ProductsListComponent,
    ProductComponent,
    ProductsSliceComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent,
    CategoriesComponent,
    NewsFeedComponent,
    SearchResultsComponent,
    CategoryListComponent,
    NavigationComponent,
    ProductSliceComponent,
    CardsCarouselComponent,
    ProductSlideComponent,
    ShippingComponent,
    SimilarsComponent,
    FooterMainComponent,
    ReturnsComponent,
    LegalComponent,
    RatingsComponent,
    SpinnerComponent,
    TermsOfUseComponent,
    PrivacyComponent,
    ShippingInfoComponent,
    FeedCardComponent,
    StripHtmlTagsPipe
  ],
  imports: [
    AppRouterModule,
    AdminModule, 
    AdminRouterModule,
    CustomerModule,
    CustomerRouterModule
  ],
  providers: [
    Globals, 
    HttpHelper,
    ListTypeService, 
    ProductsService, 
    ListingService, 
    SearchService,
    CategoryService, 
    AccountService, 
    UserAccountsService, 
    CartService, 
    OrderService, 
    LoginService, 
    SessionService, 
    UserNoteService, 
    UtilityService, 
    AuthorizationGuard, 
    ProductsResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// BrowserModule, FormsModule, ReactiveFormsModule, 
// HttpClientModule, AngularFontAwesomeModule,
