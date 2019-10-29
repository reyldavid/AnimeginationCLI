import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { CustomerRouterModule } from './customer-router/customer-router.module';

import { AccountInfoComponent } from './account-info/account-info.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { AddressSettingsComponent } from './address-settings/address-settings.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { BuyListComponent } from './buy-list/buy-list.component';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { SubtotalsComponent } from './subtotals/subtotals.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutThankyouComponent } from './checkout-thankyou/checkout-thankyou.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';
import { OrdersSummaryComponent } from './orders-summary/orders-summary.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { ProductReviewComponent } from './product-review/product-review.component';
import { UserNoteComponent } from './user-note/user-note.component';
import { FooterProductComponent } from './footer-product/footer-product.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule, FormsModule, ReactiveFormsModule, 
    HttpClientModule, AngularFontAwesomeModule,
    CustomerRouterModule
  ],
  declarations: [
    AccountInfoComponent,
    AccountSettingsComponent,
    ShoppingCartComponent,
    ProfileSettingsComponent,
    AddressSettingsComponent,
    CartItemComponent,
    WishListComponent,
    BuyListComponent,
    CheckoutAddressComponent,
    SubtotalsComponent,
    CheckoutReviewComponent,
    CheckoutThankyouComponent,
    OrdersDetailsComponent,
    OrdersSummaryComponent,
    OrderItemComponent,
    OrdersListComponent,
    ProductReviewComponent,
    UserNoteComponent,
    FooterProductComponent,
    StarRatingComponent,
    FeedbackComponent
  ],
  exports: [
    AccountInfoComponent,
    AccountSettingsComponent,
    ShoppingCartComponent,
    ProfileSettingsComponent,
    AddressSettingsComponent,
    CartItemComponent,
    WishListComponent,
    BuyListComponent,
    CheckoutAddressComponent,
    SubtotalsComponent,
    CheckoutReviewComponent,
    CheckoutThankyouComponent,
    OrdersDetailsComponent,
    OrdersSummaryComponent,
    OrderItemComponent,
    OrdersListComponent,
    ProductReviewComponent,
    UserNoteComponent,
    FooterProductComponent,
    FeedbackComponent
  ]
})
export class CustomerModule { }
