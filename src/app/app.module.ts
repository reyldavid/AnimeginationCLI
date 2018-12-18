import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Globals } from './globals';
import { HttpHelper } from './services/http.helper.service';
import { AppComponent } from './app.component';

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
import { AuthorizationGuard } from './guards/authorization.guard';
import { AppRouterModule } from './app-router/app-router.module';

import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './product/product.component';
import { ProductsSliceComponent } from './products-slice/products-slice.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrdersComponent } from './orders/orders.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { AddressSettingsComponent } from './address-settings/address-settings.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProductSliceComponent } from './product-slice/product-slice.component';
import { CardsCarouselComponent } from './cards-carousel/cards-carousel.component';
import { ProductSlideComponent } from './product-slide/product-slide.component';
import { ShippingComponent } from './shipping/shipping.component';
import { SimilarsComponent } from './similars/similars.component';
import { FooterMainComponent } from './footer-main/footer-main.component';
import { FooterProductComponent } from './footer-product/footer-product.component';
import { ReturnsComponent } from './returns/returns.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { LegalComponent } from './legal/legal.component';
import { RatingsComponent } from './ratings/ratings.component';
import { CartItemComponent } from './cart-item/cart-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    HomeComponent,
    ProductsListComponent,
    ProductComponent,
    ProductsSliceComponent,
    AccountInfoComponent,
    AccountSettingsComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
    CategoriesComponent,
    NewsFeedComponent,
    ShoppingCartComponent,
    SearchResultsComponent,
    CategoryListComponent,
    ProfileSettingsComponent,
    AddressSettingsComponent,
    NavigationComponent,
    ProductSliceComponent,
    CardsCarouselComponent,
    ProductSlideComponent,
    ShippingComponent,
    SimilarsComponent,
    FooterMainComponent,
    FooterProductComponent,
    ReturnsComponent,
    FeedbackComponent,
    LegalComponent,
    RatingsComponent,
    CartItemComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, 
    HttpClientModule, AppRouterModule
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
    AuthorizationGuard 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
