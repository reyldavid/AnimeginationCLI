import { Component, OnInit } from '@angular/core';
// import { ListTypeService } from '../services/listtypes.service';
// import { ProductsService } from '../services/products.service';
// import { ListingService } from '../services/listings.service';
// import { SearchService } from '../services/search.service';
// import { CategoryService } from '../services/categories.service';
// import { AccountService } from '../services/accounts.service';
// import { RegisterModel } from '../models/registermodel';
// import { UserAccountsService } from '../services/userAccounts.service';
// import { UserAccountModel } from '../models/userAccountModel';
// import { CartService } from '../services/cart.service';
// import { CartType } from '../models/carttype';
// import { OrderService } from '../services/orders.service';
// import { SessionService } from '../services/session.service';
// import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  // constructor(private listTypeService: ListTypeService, 
  //             private productService: ProductsService, 
  //             private listingService: ListingService, 
  //             private searchService: SearchService, 
  //             private categoryService: CategoryService, 
  //             private accountService: AccountService, 
  //             private userAccountService: UserAccountsService, 
  //             private cartService: CartService, 
  //             private orderService: OrderService, 
  //             private messageService: MessageService, 
  //             private sessionService: SessionService ) { 

  //   }
  constructor() {
  }

  ngOnInit() {

  // this.accountService.userLogin('megumi', 'Chikush0').subscribe( token => {
  //   console.log('user login');
  //   console.log(token);
  // })

  //   let registerModel1: RegisterModel = {
  //     UserId: "97547f76-b0c3-40af-9105-b71be7822182",
  //     Username: "reydavid",
  //     RoleName: "Admin",
  //     Password: "Chikush0",
  //     ConfirmPassword: "Chikush0",  
  //     FirstName: "rey",
  //     LastName: "david",
  //     Address: "69 Aodori",
  //     City: "Ikebukuro",
  //     StateId: 8,
  //     ZipCode: "94551",
  //     CellPhone: "9259842849",
  //     HomePhone: "9255556969",
  //     Email: "rdavid47@comcast.net",
  //     CreditCardType: "VISA",
  //     CreditCardNumber: "1234567890123456",
  //     CreditCardExpiration: "12/26"
  // }

  // let userAccountModel2 = {
  //   UserId: "67462d6b-e940-40e7-9b30-f5e82a7e263c",
  //   UserName: "sakura", 
  //   FirstName: "sakura",
  //   LastName: "yokomine",
  //   Address: "69 San choome",
  //   City: "Asakusa",
  //   State: "CA", 
  //   StateId: 8,
  //   ZipCode: "94551",
  //   CellPhone: "9259843950",
  //   HomePhone: "4086906969",
  //   Email: "sakura@animegination.net",
  //   Created: "", 
  //   CreditCardType: "VISA",
  //   CreditCardNumber: "1234567890123456",
  //   CreditCardExpiration: "12/24"
  // }

  //   let token = this.sessionService.UserToken;

  //   this.cartService.getCartItems(token, CartType.shoppingCart).subscribe( items => {
  //     console.log('cart items');
  //     console.log(items);
  //     this.messageService.setSpinner(false);
  //   })

  // console.log('about init');
  // console.log('about href ' + window.location.href);
  // console.log('about path ' + window.location.pathname);  
  }
}
