import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { AuthorizationGuard as AuthGuard} from '../../guards/authorization.guard';
import { CanDeactivateGuard as DeactivateGuard } from '../../guards/can-deactivate.guard';
import { AccountInfoComponent } from '../account-info/account-info.component';
import { AccountSettingsComponent } from '../account-settings/account-settings.component';
import { OrdersDetailsComponent } from '../orders-details/orders-details.component';
import { OrdersSummaryComponent } from '../orders-summary/orders-summary.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ProfileSettingsComponent } from '../profile-settings/profile-settings.component';
import { AddressSettingsComponent } from '../address-settings/address-settings.component';
import { CheckoutAddressComponent } from '../checkout-address/checkout-address.component';
import { CheckoutReviewComponent } from '../checkout-review/checkout-review.component';
import { CheckoutThankyouComponent } from '../checkout-thankyou/checkout-thankyou.component';
import { OrdersListComponent } from '../orders-list/orders-list.component';
import { ProductReviewComponent } from '../product-review/product-review.component';
import { UserNoteComponent } from '../user-note/user-note.component';
import { FeedbackComponent } from '../feedback/feedback.component';

const routes: Routes = [
  { path: 'account', component: AccountInfoComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: AccountSettingsComponent, canActivate: [AuthGuard] },
  { path: 'orders-details', component: OrdersDetailsComponent, canActivate: [AuthGuard] },
  { path: 'orders-summary', component: OrdersSummaryComponent, canActivate: [AuthGuard] },
  { path: 'orders-list', component: OrdersListComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateGuard] },
  { path: 'profile', component: ProfileSettingsComponent, canActivate: [AuthGuard] },
  { path: 'address', component: AddressSettingsComponent, canActivate: [AuthGuard] }, 
  { path: 'checkout-address', component: CheckoutAddressComponent, canActivate: [AuthGuard] }, 
  { path: 'checkout-review', component: CheckoutReviewComponent, canActivate: [AuthGuard] }, 
  { path: 'checkout-thankyou', component: CheckoutThankyouComponent, canActivate: [AuthGuard] },
  { path: 'product-review', component: ProductReviewComponent, canActivate: [AuthGuard] }, 
  { path: 'user-note', component: UserNoteComponent, canActivate: [AuthGuard] },
  { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CustomerRouterModule { }
