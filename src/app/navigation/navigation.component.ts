import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public userFirstName: string;

  constructor(private _router: Router, 
              private _loginService: LoginService, 
              private _sessionService: SessionService ) {
      _loginService.userLoggedIn.subscribe(firstName => {
        this.userFirstName = firstName;
    });
    //   localStorage.removeItem('jwt');
    // this._sessionService.clearSession();
    // this._router.navigate(['Home']);
    if (_sessionService.isAuthenticated()) {
        this.userFirstName = _sessionService.UserAccount.FirstName;
    }
}

  ngOnInit(): any {
      console.log('home init');
  }

  onSearch(searchText: string) {
      console.log('onSearch ' + searchText);
      this._router.navigate(['search', { searchText: searchText } ]);
  }

  logout() {
      // Logging out means just deleting the JWT from localStorage and redirecting the user to the Login page
      //   localStorage.removeItem('jwt');
      this._sessionService.clearSession();
      this.userFirstName = '';
    //   let returnUrl = window.location.pathname;
    //   this._router.navigateByUrl(returnUrl);
    //   this._router.navigate([returnUrl]);
       this._router.navigate(['/home'])
  }

  login() {
      let returnUrl = window.location.pathname;
      let search = window.location.search;
      returnUrl = search ? returnUrl.concat(search) : returnUrl;
      this._router.navigate(['/login'], { queryParams: {  returnUrl: returnUrl } });
  }

}
