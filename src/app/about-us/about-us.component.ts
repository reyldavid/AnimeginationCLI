import { Component, OnInit } from '@angular/core';
import { ListTypeService } from '../services/listtypes.service';
import { ProductsService } from '../services/products.service';
import { ListingService } from '../services/listings.service';
import { SearchService } from '../services/search.service';
import { CategoryService } from '../services/categories.service';
import { AccountService } from '../services/accounts.service';
import { RegisterModel } from '../models/registermodel';
import { UserAccountsService } from '../services/userAccounts.service';
import { UserAccountModel } from '../models/userAccountModel';
import { CartService } from '../services/cart.service';
import { CartType } from '../models/carttype';
import { OrderService } from '../services/orders.service';
import { SessionService } from '../services/session.service';
import { MessageService } from '../services/message.service';
// import { ApiProduct } from '../models/product';
// import { ListType } from '../models/listtype';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private listTypeService: ListTypeService, 
              private productService: ProductsService, 
              private listingService: ListingService, 
              private searchService: SearchService, 
              private categoryService: CategoryService, 
              private accountService: AccountService, 
              private userAccountService: UserAccountsService, 
              private cartService: CartService, 
              private orderService: OrderService, 
              private messageService: MessageService, 
              private sessionService: SessionService ) { 

    }

  ngOnInit() {

    // this.listTypeService.getAnimeListType(2).subscribe( listType => {
    //   console.log('listType');
    //   console.log(listType);

    //   this.listTypeService.setListTypeCache(listType, 2);

    //   this.listTypeService.getAnimeListType(2).subscribe( listType => {
    //     console.log('listType');
    //     console.log(listType);
    //   })
    // })

    // this.productService.getAnimeProduct(1042).subscribe( products => {
    //   console.log('product');
    //   console.log(products);

    //   this.productService.setProductCache(products, 1042);

    //   this.productService.getAnimeProduct(1042).subscribe( products => {
    //     console.log('product');
    //     console.log(products);
    //   })
    // })

    // this.productService.getAnimeProducts().subscribe( products => {
    //   console.log('products');
    //   console.log(products);

    //   this.productService.setProductsCache(products);

    //   this.productService.getAnimeProducts().subscribe( products => {
    //     console.log('products');
    //     console.log(products);
    //   })
    // })

    // this.listingService.getAnimeListing(2).subscribe( listings => {
    //   console.log('listings');
    //   console.log(listings);

    //   this.listingService.setListingCache(listings, 2);

    //   this.listingService.getAnimeListing(2).subscribe( listings => {
    //     console.log('listings');
    //     console.log(listings);
    //   })
    // })

    // this.searchService.getAnimeSearch('haru').subscribe( search => {
    //   console.log('search');
    //   console.log(search);

    //   this.searchService.setSearchCache(search, 'haru');
    //   this.searchService.getAnimeSearch('haru').subscribe( search => {
    //     console.log('search');
    //     console.log(search);
    //   })
    // })

    // this.searchService.getAnimeSimilars(1040).subscribe( similars => {
    //   console.log('similars');
    //   console.log(similars);

    //   this.searchService.setSimilarsCache( similars, 1040);
    //   this.searchService.getAnimeSimilars(1040).subscribe( similars => {
    //     console.log('similars');
    //     console.log(similars);
    //   })
    // })

    // this.categoryService.getAnimeCategory(4).subscribe( category => {
    //   console.log('category');
    //   console.log(category);

    //   this.categoryService.setCategoryCache(category, 4);

    //   this.categoryService.getAnimeCategory(4).subscribe( category => {
    //     console.log('category');
    //     console.log(category);
    //   })
    // })

    // this.categoryService.getAnimeCategories().subscribe( categories => {
    //   console.log('categories');
    //   console.log(categories);

    //   this.categoryService.setCategoriesCache(categories);

    //   this.categoryService.getAnimeCategories().subscribe( categories => {
    //     console.log('categories');
    //     console.log(categories);
    //   })
    // })

    // this.categoryService.getAnimeCategoryList(4).subscribe( categories => {
    //   console.log('category list');
    //   console.log(categories);

    //   this.categoryService.setCategoryListCache(categories, 4);

    //   this.categoryService.getAnimeCategoryList(4).subscribe( categories => {
    //     console.log('category list');
    //     console.log(categories);
    //   })
    // })

    // this.accountService.userLogin('megumi', 'Chikush0').subscribe( token => {
    //   console.log('user login');
    //   console.log(token);
    // })

    let registerModel1: RegisterModel = {
      UserId: "97547f76-b0c3-40af-9105-b71be7822182",
      Username: "reydavid",
      RoleName: "Admin",
      Password: "Chikush0",
      ConfirmPassword: "Chikush0",  
      FirstName: "rey",
      LastName: "david",
      Address: "69 Aodori",
      City: "Ikebukuro",
      StateId: 8,
      ZipCode: "94551",
      CellPhone: "9259842849",
      HomePhone: "9255556969",
      Email: "rdavid47@comcast.net",
      CreditCardType: "VISA",
      CreditCardNumber: "1234567890123456",
      CreditCardExpiration: "12/26"
  }

  let registerModel2: RegisterModel = {
    UserId: "67462d6b-e940-40e7-9b30-f5e82a7e263c",
    Username: "sakura",
    RoleName: "Customer",
    Password: "Chikush0",
    ConfirmPassword: "Chikush0",  
    FirstName: "sakura",
    LastName: "yokomine",
    Address: "69 San choome",
    City: "Asakusa",
    StateId: 8,
    ZipCode: "94551",
    CellPhone: "9259843950",
    HomePhone: "9255556969",
    Email: "sakura@animegination.net",
    CreditCardType: "VISA",
    CreditCardNumber: "1234567890123456",
    CreditCardExpiration: "12/24"
  }

  let userAccountModel2: UserAccountModel = {
    UserId: "67462d6b-e940-40e7-9b30-f5e82a7e263c",
    UserName: "sakura", 
    FirstName: "sakura",
    LastName: "yokomine",
    Address: "69 San choome",
    City: "Asakusa",
    State: "CA", 
    StateId: 8,
    ZipCode: "94551",
    CellPhone: "9259843950",
    HomePhone: "4086906969",
    Email: "sakura@animegination.net",
    Created: "", 
    CreditCardType: "VISA",
    CreditCardNumber: "1234567890123456",
    CreditCardExpiration: "12/24"
  }

  let userAccountModel3: UserAccountModel = {
    UserId: "67462d6b-e940-40e7-9b30-f5e82a7e263c",
    UserName: "sakura", 
    FirstName: "sakura",
    LastName: "yokomine",
    Address: "69 San choome",
    City: "Roponggi",
    State: "CA", 
    StateId: 8,
    ZipCode: "94551",
    CellPhone: "9259843950",
    HomePhone: "4086906969",
    Email: "sakura@animegination.net",
    Created: "", 
    CreditCardType: "Mastercard",
    CreditCardNumber: "1234567890123456",
    CreditCardExpiration: "12/69"
  }
  // this.accountService.createUser(registerModel1).subscribe( user => {
  //     console.log('user created');
  //     console.log(user);
  //   })

  // this.accountService.userLogin('megumi', 'Chikush0').subscribe( token => {
  //   console.log('user login');
  //   console.log(token);

  //   this.userAccountService.getUserAccount(token).subscribe( user => {
  //     console.log('user account get');
  //     console.log(user);
  //   })
  // })

    let registerModel4: RegisterModel = {
      UserId: "d7aecc80-9046-47d0-9fce-b2a8049c1d74",
      Username: "ayaueto2",
      RoleName: "Admin",
      Password: "Chikush0",
      ConfirmPassword: "Chikush0",  
      FirstName: "aya2",
      LastName: "ueto2",
      Address: "69 Aodori",
      City: "Ikebukuro",
      StateId: 8,
      ZipCode: "94506",
      CellPhone: "9259842851",
      HomePhone: "9255556971",
      Email: "ayaueto2@comcast.net",
      CreditCardType: "VISA",
      CreditCardNumber: "1234567890123456",
      CreditCardExpiration: "03/24"
  }

  // this.accountService.createUser(registerModel4).subscribe( user => {
  //     console.log('user created ayaueto2');
  //     console.log(user);
  //   })

  // this.userAccountService.createUserAccount(registerModel4).subscribe( token => {
  //   console.log('user account created ayaueto2');
  //   console.log(token);
  // })

  // this.userAccountService.createUserAccount(registerModel2).subscribe( token => {
  //   console.log('user account created sakura');
  //   console.log(token);
  // })

  // this.accountService.userLogin('sakura', 'Chikush0').subscribe( token => {
  //   console.log('user login sakura');
  //   console.log(token);

  //   this.userAccountService.updateUserAccountNames(token, userAccountModel2).subscribe( user => {
  //     console.log('user account names');
  //     console.log(user);
  //   })

  //   this.userAccountService.updateUserAccountAddress(token, userAccountModel3).subscribe( user => {
  //     console.log('user account address');
  //     console.log(user);
  //   })

  // })

  // this.accountService.userLogin('naegino', 'Chikush0').subscribe( token => {
  //   console.log('user login naegino');
  //   console.log(token);

    let token = this.sessionService.UserToken;

    this.cartService.getCartItems(token, CartType.shoppingCart).subscribe( items => {
      console.log('cart items');
      console.log(items);
      this.messageService.setSpinner(false);
    })

  //   this.orderService.getOrderTotals(token, CartType.shoppingCart).subscribe( orders => {
  //     console.log('order totals');
  //     console.log(orders);
  //   })

  // })

      console.log('about init');
      console.log('about href ' + window.location.href);
      console.log('about path ' + window.location.pathname);  
  }
}
