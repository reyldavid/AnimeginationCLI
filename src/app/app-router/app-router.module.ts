import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from '../about-us/about-us.component';
import { HomeComponent } from '../home/home.component';
import { ProductsListComponent } from '../products-list/products-list.component';
import { ProductComponent } from '../product/product.component';
import { ProductsSliceComponent } from '../products-slice/products-slice.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CategoriesComponent } from '../categories/categories.component';
import { NewsFeedComponent } from '../news-feed/news-feed.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { CategoryListComponent } from '../category-list/category-list.component';
import { ShippingComponent } from '../shipping/shipping.component';
import { ShippingInfoComponent } from '../shipping-info/shipping-info.component';
import { ReturnsComponent } from '../returns/returns.component';
import { LegalComponent } from '../legal/legal.component';
import { RatingsComponent } from '../ratings/ratings.component';
import { TermsOfUseComponent } from '../terms-of-use/terms-of-use.component';
import { PrivacyComponent } from '../privacy/privacy.component';
import { AuthorizationGuard as AuthGuard} from '../guards/authorization.guard';
import { CanDeactivateGuard as DeactivateGuard } from '../guards/can-deactivate.guard';
import { AdminGuard } from '../guards/admin.guard';
import { ProductsResolve } from '../guards/products-resolve.guard';
import { ReydavidComponent } from '../reydavid/reydavid.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'list', component: ProductsListComponent },
  { path: 'detail', component: ProductComponent, canDeactivate: [DeactivateGuard] },
  { path: 'detail/:productID', component: ProductComponent, 
            resolve: { product: ProductsResolve }, canDeactivate: [DeactivateGuard] },
  { path: 'slice/:listTypeID', component: ProductsSliceComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'genres', component: CategoriesComponent },
  { path: 'news', component: NewsFeedComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'category-list', component: CategoryListComponent },
  { path: 'shipping', component: ShippingComponent }, 
  { path: 'shipping-info', component: ShippingInfoComponent },
  { path: 'returns', component: ReturnsComponent }, 
  { path: 'legal', component: LegalComponent }, 
  { path: 'ratings', component: RatingsComponent }, 
  { path: 'terms-of-use', component: TermsOfUseComponent }, 
  { path: 'privacy', component: PrivacyComponent }, 
  { path: 'reydavid', component: ReydavidComponent }
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
