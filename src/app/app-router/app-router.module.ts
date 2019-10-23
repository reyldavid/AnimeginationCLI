import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from '../about-us/about-us.component';
import { HomeComponent } from '../home/home.component';
import { ProductsListComponent } from '../products-list/products-list.component';
import { ProductComponent } from '../product/product.component';
import { ProductsSliceComponent } from '../products-slice/products-slice.component';
import { AccountInfoComponent } from '../account-info/account-info.component';
import { AccountSettingsComponent } from '../account-settings/account-settings.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { OrdersDetailsComponent } from '../orders-details/orders-details.component';
import { OrdersSummaryComponent } from '../orders-summary/orders-summary.component';
import { CategoriesComponent } from '../categories/categories.component';
import { NewsFeedComponent } from '../news-feed/news-feed.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { CategoryListComponent } from '../category-list/category-list.component';
import { ProfileSettingsComponent } from '../profile-settings/profile-settings.component';
import { AddressSettingsComponent } from '../address-settings/address-settings.component';
import { ShippingComponent } from '../shipping/shipping.component';
import { ShippingInfoComponent } from '../shipping-info/shipping-info.component';
import { ReturnsComponent } from '../returns/returns.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { LegalComponent } from '../legal/legal.component';
import { RatingsComponent } from '../ratings/ratings.component';
import { CheckoutAddressComponent } from '../checkout-address/checkout-address.component';
import { CheckoutReviewComponent } from '../checkout-review/checkout-review.component';
import { CheckoutThankyouComponent } from '../checkout-thankyou/checkout-thankyou.component';
import { TermsOfUseComponent } from '../terms-of-use/terms-of-use.component';
import { PrivacyComponent } from '../privacy/privacy.component';
import { AuthorizationGuard as AuthGuard} from '../guards/authorization.guard';
import { CanDeactivateGuard as DeactivateGuard } from '../guards/can-deactivate.guard';
import { OrdersListComponent } from '../orders-list/orders-list.component';
import { ProductReviewComponent } from '../product-review/product-review.component';
import { UserNoteComponent } from '../user-note/user-note.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { AdminGuard } from '../guards/admin.guard';
import { GenreComponent } from '../genre/genre.component';
import { ProductInfoComponent } from '../product-info/product-info.component';
import { MediumComponent } from '../medium/medium.component';
import { PublisherComponent } from '../publisher/publisher.component';
import { ListingComponent } from '../listing/listing.component';
import { CustomerNoteComponent } from '../customer-note/customer-note.component';
import { UserFeedbackComponent } from '../user-feedback/user-feedback.component';
import { MediumEditComponent } from '../medium-edit/medium-edit.component';
import { MediumAddComponent } from '../medium-add/medium-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'list', component: ProductsListComponent },
  { path: 'detail', component: ProductComponent, canDeactivate: [DeactivateGuard] },
  { path: 'detail/:productID', component: ProductComponent, canDeactivate: [DeactivateGuard] },
  { path: 'slice/:listTypeID', component: ProductsSliceComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'account', component: AccountInfoComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: AccountSettingsComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'orders-details', component: OrdersDetailsComponent, canActivate: [AuthGuard] },
  { path: 'orders-summary', component: OrdersSummaryComponent, canActivate: [AuthGuard] },
  { path: 'orders-list', component: OrdersListComponent, canActivate: [AuthGuard] },
  { path: 'genres', component: CategoriesComponent },
  { path: 'news', component: NewsFeedComponent },
  { path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateGuard] },
  { path: 'search', component: SearchResultsComponent },
  { path: 'category-list', component: CategoryListComponent },
  { path: 'profile', component: ProfileSettingsComponent, canActivate: [AuthGuard] },
  { path: 'address', component: AddressSettingsComponent, canActivate: [AuthGuard] }, 
  { path: 'shipping', component: ShippingComponent }, 
  { path: 'shipping-info', component: ShippingInfoComponent },
  { path: 'returns', component: ReturnsComponent }, 
  { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard] }, 
  { path: 'legal', component: LegalComponent }, 
  { path: 'ratings', component: RatingsComponent }, 
  { path: 'checkout-address', component: CheckoutAddressComponent, canActivate: [AuthGuard] }, 
  { path: 'checkout-review', component: CheckoutReviewComponent, canActivate: [AuthGuard] }, 
  { path: 'checkout-thankyou', component: CheckoutThankyouComponent, canActivate: [AuthGuard] },
  { path: 'terms-of-use', component: TermsOfUseComponent }, 
  { path: 'privacy', component: PrivacyComponent }, 
  { path: 'product-review', component: ProductReviewComponent, canActivate: [AuthGuard] }, 
  { path: 'user-note', component: UserNoteComponent, canActivate: [AuthGuard] },
  { path: 'user-info', component: UserInfoComponent, canActivate: [AdminGuard] },
  { path: 'genre', component: GenreComponent, canActivate: [AdminGuard] },
  { path: 'product-info', component: ProductInfoComponent, canActivate: [AdminGuard] }, 
  { path: 'medium', component: MediumComponent, canActivate: [AdminGuard] }, 
  { path: 'medium-edit', component: MediumEditComponent, canActivate: [AdminGuard] }, 
  { path: 'medium-add', component: MediumAddComponent, canActivate: [AdminGuard] }, 
  { path: 'publisher', component: PublisherComponent, canActivate: [AdminGuard] }, 
  { path: 'listing', component: ListingComponent, canActivate: [AdminGuard] }, 
  { path: 'customer-note', component: CustomerNoteComponent, canActivate: [AdminGuard] }, 
  { path: 'user-feedback', component: UserFeedbackComponent, canActivate: [AdminGuard] } 
]
// { path: 'genre/:categoryID', component: CategoryListComponent },

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRouterModule { }
