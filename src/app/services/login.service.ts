import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class LoginService {
    public userLoggedIn: EventEmitter<string>;

    constructor() {
        this.userLoggedIn = new EventEmitter();
    }

    public login(firstName: string): void {
        if (firstName) {
            this.userLoggedIn.emit(firstName);
        }
    }
}
