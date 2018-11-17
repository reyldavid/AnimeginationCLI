import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { OrdersComponent } from '../orders/orders.component';
import { CategoriesComponent } from '../categories/categories.component';
import { NewsFeedComponent } from '../news-feed/news-feed.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { CategoryListComponent } from '../category-list/category-list.component';
import { ProfileSettingsComponent } from '../profile-settings/profile-settings.component';
import { AddressSettingsComponent } from '../address-settings/address-settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'all', component: ProductsListComponent },
  { path: 'detail', component: ProductComponent },
  { path: 'slice/:listTypeID', component: ProductsSliceComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'account', component: AccountInfoComponent },
  { path: 'settings', component: AccountSettingsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'genres', component: CategoriesComponent },
  { path: 'news', component: NewsFeedComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'genre', component: CategoryListComponent },
  { path: 'profile', component: ProfileSettingsComponent },
  { path: 'address', component: AddressSettingsComponent }
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
