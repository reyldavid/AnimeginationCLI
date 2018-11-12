import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public userFirstName: string;

  constructor(private _router: Router, 
              private _loginService: LoginService) {
      _loginService.userLoggedIn.subscribe(firstName => this.onUserLogin(firstName));
  }

  ngOnInit(): any {
      console.log('home init');
      localStorage.removeItem('jwt');
      // this._router.navigate(['Home']);
  }

  onSearch(searchText: string) {
      console.log('onSearch ' + searchText);
      this._router.navigate(['search', { searchText: searchText } ]);
  }

  onUserLogin(userFirstName: string) {
      this.userFirstName = userFirstName;
  }

  logout() {
      // Logging out means just deleting the JWT from localStorage and redirecting the user to the Login page
      localStorage.removeItem('jwt');
      this.userFirstName = '';
  }

}
